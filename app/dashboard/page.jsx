"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Github,
  Trash2,
  CheckCircle,
  Loader2,
  Star,
  GitBranch,
  Eye,
  AlertCircle,
  Calendar,
  Book,
  Code,
  HardDrive,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [repos, setRepos] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [checkingPermissions, setCheckingPermissions] = useState(false);
  const router = useRouter();

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  // Load cached repos first, then fetch fresh from GitHub
  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.accessToken &&
      session?.user?.login
    ) {
      const cached = sessionStorage.getItem("repos_cache");
      if (cached) setRepos(JSON.parse(cached));
      fetchRepos();
      checkPermissions();
    }
  }, [status, session]);

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.github.com/user/repos?per_page=100&sort=updated&direction=desc`,
        {
          headers: {
            Authorization: `token ${session.accessToken}`,
            "User-Agent": "YourApp/1.0",
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      if (Array.isArray(data)) {
        setRepos(data);
        sessionStorage.setItem("repos_cache", JSON.stringify(data));
      } else {
        toast.error("Error parsing repository data.");
      }
    } catch (err) {
      console.error("Fetch repos error:", err);
      toast.error("Failed to fetch repositories. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const checkPermissions = async () => {
    if (!repos.length) return true;

    setCheckingPermissions(true);
    try {
      const repoRes = await fetch(
        `https://api.github.com/repos/${session.user.login}/${repos[0].name}`,
        {
          headers: {
            Authorization: `token ${session.accessToken}`,
            "User-Agent": "YourApp/1.0",
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (repoRes.ok) {
        const repoData = await repoRes.json();
        const permissions = repoData.permissions || {};

        if (!permissions.admin) {
          toast.warning(
            "Limited permissions detected. Repository deletion may not work. Please re-authenticate.",
            { duration: 8000 }
          );
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error("Permission check failed:", error);
      return false;
    } finally {
      setCheckingPermissions(false);
    }
  };

  const toggleSelect = (repoName) => {
    setSelectedRepos((prev) =>
      prev.includes(repoName)
        ? prev.filter((name) => name !== repoName)
        : [...prev, repoName]
    );
  };

  const testPermissions = async () => {
    const hasPerm = await checkPermissions();
    toast[hasPerm ? "success" : "error"](
      `Delete permission: ${hasPerm ? "✅ OK" : "❌ Missing"}`
    );
  };

  const handleDelete = async () => {
    if (selectedRepos.length === 0) {
      toast.info("No repositories selected.");
      return;
    }

    // Check permissions before showing confirmation
    const hasPermission = await checkPermissions();
    if (!hasPermission) {
      toast.error(
        "Insufficient permissions. Please re-authenticate and try again."
      );
      return;
    }

    toast.custom(
      (t) => (
        <div className="bg-background border border-border rounded-lg p-4 shadow-lg max-w-md w-full">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-destructive" />
              <span className="font-semibold">Confirm Deletion</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete{" "}
              <strong>{selectedRepos.length}</strong>{" "}
              {selectedRepos.length > 1 ? "repositories" : "repository"}? This
              action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.dismiss(t)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={async () => {
                  toast.dismiss(t);
                  await performDelete();
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      ),
      { duration: 10000 }
    );
  };

  const performDelete = async () => {
    if (selectedRepos.length === 0) return;

    setDeleting(true);
    const failedDeletions = [];
    const successfulDeletions = [];

    // Remove from UI immediately for better UX
    setRepos((prev) =>
      prev.filter((repo) => !selectedRepos.includes(repo.name))
    );
    const originalSelected = [...selectedRepos];
    setSelectedRepos([]);

    // Update cache immediately
    sessionStorage.setItem(
      "repos_cache",
      JSON.stringify(repos.filter((r) => !originalSelected.includes(r.name)))
    );

    // Process deletions sequentially to avoid rate limiting
    for (const repoName of originalSelected) {
      try {
        console.log(
          `🔄 Attempting to delete: ${session.user.login}/${repoName}`
        );

        const deleteResponse = await fetch(
          `https://api.github.com/repos/${session.user.login}/${repoName}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `token ${session.accessToken}`,
              "User-Agent": "YourApp/1.0",
              Accept: "application/vnd.github.v3+json",
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );

        const responseText = await deleteResponse.text();
        console.log(`📡 Delete response for ${repoName}:`, {
          status: deleteResponse.status,
          statusText: deleteResponse.statusText,
          body: responseText,
        });

        if (deleteResponse.ok) {
          console.log(`✅ Successfully deleted ${repoName}`);
          successfulDeletions.push(repoName);
        } else {
          console.error(`❌ Failed to delete ${repoName}:`, {
            status: deleteResponse.status,
            statusText: deleteResponse.statusText,
            response: responseText,
          });

          failedDeletions.push(repoName);

          // Handle specific error cases
          if (deleteResponse.status === 403) {
            toast.error(
              `Permission denied for ${repoName}. Missing 'delete_repo' scope.`
            );
          } else if (deleteResponse.status === 404) {
            toast.warning(`${repoName} not found on GitHub.`);
          } else if (deleteResponse.status === 422) {
            toast.error(`Cannot delete ${repoName}: Validation failed`);
          } else {
            toast.error(
              `Failed to delete ${repoName}: HTTP ${deleteResponse.status}`
            );
          }

          // Restore from GitHub on failure
          await fetchRepos();
        }
      } catch (error) {
        console.error(`💥 Exception deleting ${repoName}:`, error);
        failedDeletions.push(repoName);
        toast.error(`Network error deleting ${repoName}`);
        await fetchRepos();
      }
    }

    setDeleting(false);

    // Show results
    if (successfulDeletions.length > 0) {
      toast.success(
        `✅ Successfully deleted ${successfulDeletions.length} ${
          successfulDeletions.length > 1 ? "repositories" : "repository"
        }!`
      );
    }

    if (failedDeletions.length > 0) {
      toast.error(`❌ Failed to delete ${failedDeletions.length} repositories`);
      console.log("Failed repos:", failedDeletions);
      console.log("Check browser console for detailed error information");
    }

    // Refresh repos list if any successful deletions
    if (successfulDeletions.length > 0) {
      setTimeout(() => fetchRepos(), 2000); // Give GitHub time to process
    }
  };

  if (status === "loading")
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading session...
      </div>
    );

  if (status === "unauthenticated") return null;

  return (
    <div className="min-h-screen py-24">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Github className="w-6 h-6" /> Welcome{" "}
            {session?.user?.login || "Guest"}
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={testPermissions}
            disabled={checkingPermissions}
          >
            {checkingPermissions ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <AlertTriangle className="w-4 h-4 mr-2" />
            )}
            Test Permissions
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={selectedRepos.length === 0 || deleting || loading}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {deleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              `Delete Selected (${selectedRepos.length})`
            )}
          </Button>
          {selectedRepos.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setSelectedRepos([])}
              disabled={deleting || loading}
            >
              Clear Selection
            </Button>
          )}
          <Button
            variant="outline"
            onClick={fetchRepos}
            disabled={loading || deleting}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {loading && !deleting ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading
            repositories...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {repos.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground mb-4">
                  No repositories found.
                </p>
                <Button
                  variant="outline"
                  onClick={fetchRepos}
                  disabled={deleting || loading}
                  className="mt-2"
                >
                  Retry Fetch
                </Button>
              </div>
            ) : (
              repos.map((repo) => (
                <Card
                  key={repo.id}
                  className={`relative backdrop-blur-xs bg-card cursor-pointer border-2 transition-all duration-200 hover:shadow-md ${
                    selectedRepos.includes(repo.name)
                      ? "border-destructive bg-destructive/10"
                      : "border-border hover:border-primary/30"
                  }`}
                  onClick={() =>
                    !deleting && !loading && toggleSelect(repo.name)
                  }
                >
                  {selectedRepos.includes(repo.name) && (
                    <CheckCircle className="absolute top-3 right-3 bg-background rounded-full p-1 text-destructive w-6 h-6" />
                  )}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg truncate flex items-center gap-2">
                      <Github className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{repo.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {repo.description || "No description available"}
                    </p>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitBranch className="w-3 h-3" /> {repo.forks_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {repo.watchers_count}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />{" "}
                          {repo.open_issues_count} issues
                        </span>
                        <span className="flex items-center gap-1">
                          <Code className="w-3 h-3" /> {repo.language || "N/A"}
                        </span>
                        <span className="flex items-center gap-1 text-xs">
                          <HardDrive className="w-3 h-3" />{" "}
                          {(repo.size / 1024).toFixed(1)} MB
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            repo.private
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                              : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          }`}
                        >
                          {repo.private ? "Private" : "Public"}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />{" "}
                          {new Date(repo.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {deleting && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-2 text-destructive">
                <Loader2 className="animate-spin w-5 h-5" />
                <span>Processing deletions...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
