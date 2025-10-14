"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Loader2, Github } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LogOut } from "lucide-react";

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    try {
      setIsLoading(true);
      await signIn("github", {
        callbackUrl: "/dashboard",
        redirect: true,
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
        redirect: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoading(false);
    }
  };

  const buttonStyle =
    "inline-flex items-center justify-center px-5 py-3 rounded-full shadow-md font-semibold text-lg transition-transform duration-300";

  if (status === "loading" || isLoading) {
    return (
      <div
        className={`${buttonStyle} bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200`}
        aria-live="polite"
      >
        <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />
        Loading...
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className={`${buttonStyle} bg-red-100 `}>
        <Link
          href="/dashboard"
          className="mr-3 text-blue-500 hover:underline hover:text-blue-600 transition-colors"
          aria-label="Go to dashboard"
        >
          Hi, {session.user.name?.split(" ")[0] || session.user.login || "User"}
        </Link>
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className="inline-flex text-white items-center bg-red-500 hover:bg-red-600 px-2 hover:scale-105 rounded-full transition-transform gap-2"
          aria-label="Sign out"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            <div className="flex items-center">
              Logout
              <LogOut />{" "}
            </div>
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleGitHubLogin}
      disabled={isLoading}
      className={`${buttonStyle} bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200`}
      aria-label="Sign in with GitHub"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />
      ) : (
        <>
          <Github className="w-5 h-5 mr-2" aria-hidden="true" />
          Login with GitHub
        </>
      )}
    </button>
  );
}
