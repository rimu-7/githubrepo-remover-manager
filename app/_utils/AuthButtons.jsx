"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2, Github } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    try {
      setIsLoading(true);
      await signIn("github", { 
        callbackUrl: "/dashboard",
        redirect: true 
      });
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut({ 
        callbackUrl: "/",
        redirect: true 
      });
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center gap-2" aria-live="polite">
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link 
          href="/dashboard" 
          className="text-sm hover:text-blue-600 transition-colors"
          aria-label="Go to dashboard"
        >
          Hi, {session.user.name?.split(" ")[0] || session.user.login || "User"}
        </Link>
        <Button
          variant="destructive"
          onClick={handleSignOut}
          size="sm"
          disabled={isLoading}
          aria-label="Sign out"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            "Logout"
          )}
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleGitHubLogin}
      size="sm"
      disabled={isLoading}
      className="flex items-center gap-2"
      aria-label="Sign in with GitHub"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
      ) : (
        <>
          <Github className="w-4 h-4" aria-hidden="true" />
          Login with GitHub
        </>
      )}
    </Button>
  );
}