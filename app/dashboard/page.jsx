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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [repos, setRepos] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [loading, setLoading] = useState(false);
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
      fetchRepos(); // fetch fresh in background
    }
  }, [status, session]);

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.github.com/user/repos?per_page=100&sort=updated&direction=desc`,
        { headers: { Authorization: `token ${session.accessToken}` } }
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setRepos(data);
        sessionStorage.setItem("repos_cache", JSON.stringify(data));
      } else {
        toast.error("Error fetching repositories.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch repositories.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (repoName) => {
    setSelectedRepos((prev) =>
      prev.includes(repoName)
        ? prev.filter((name) => name !== repoName)
        : [...prev, repoName]
    );
  };

  const handleDelete = async () => {
    if (selectedRepos.length === 0) {
      toast.info("No repositories selected.");
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
    setLoading(true);

    const deletedRepos = [];
    for (const name of selectedRepos) {
      setRepos((prev) => prev.filter((r) => r.name !== name));
      deletedRepos.push(name);

      // Delete on GitHub (async)
      fetch(`https://api.github.com/repos/${session.user.login}/${name}`, {
        method: "DELETE",
        headers: { Authorization: `token ${session.accessToken}` },
      }).then(async (res) => {
        if (!res.ok)
          console.error(`Failed to delete `);
      });

      // Log in MongoDB (async)
      fetch("/api/repos/logAction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoName: name, action: "delete" }),
      }).catch(console.error);
    }

    setSelectedRepos([]);
    setLoading(false);
    toast.success(
      `Deleted ${deletedRepos.length} ${
        deletedRepos.length > 1 ? "repos" : "repo"
      }!`
    );
    sessionStorage.setItem(
      "repos_cache",
      JSON.stringify(repos.filter((r) => !deletedRepos.includes(r.name)))
    );
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
          
        </div>

        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!selectedRepos || loading}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected ({selectedRepos.length})
          </Button>
          {selectedRepos.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setSelectedRepos([])}
              disabled={loading}
            >
              Clear Selection
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading
            repositories...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {!repos ? (
              <div className="col-span-full  text-center py-8">
                <p>No repositories found.</p>
                <Button variant="outline" onClick={fetchRepos} className="mt-2">
                  Retry
                </Button>
              </div>
            ) : (
              repos.map((repo) => (
                <Card
                  key={repo.id}
                  className={`relative backdrop-blur-xs bg-transparent cursor-pointer border-2 ${
                    selectedRepos.includes(repo.name)
                      ? "border-destructive bg-destructive/50"
                      : "border-transparent hover:border-muted-foreground/20"
                  }`}
                  onClick={() => toggleSelect(repo.name)}
                >
                  {selectedRepos.includes(repo.name) && (
                    <CheckCircle className="absolute top-3 right-3 text-destructive w-5 h-5" />
                  )}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg truncate flex items-center gap-2">
                      <Github className="w-4 h-4" /> {repo.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {repo.description || "No description"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" /> {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3" /> {repo.forks_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {repo.watchers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />{" "}
                        {repo.open_issues_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <Book className="w-3 h-3" />{" "}
                        {repo.license?.name || "No license"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Code className="w-3 h-3" /> {repo.language || "N/A"}
                      </span>
                      <span className="flex items-center gap-1">
                        <HardDrive className="w-3 h-3" />{" "}
                        {(repo.size / 1024).toFixed(2)} MB
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-white ${
                          repo.private ? "bg-yellow-600" : "bg-blue-600"
                        }`}
                      >
                        {repo.private ? "Private" : "Public"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{" "}
                        {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
