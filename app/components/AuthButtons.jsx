"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Loader2, Github, LogOut } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    await signIn("github", { callbackUrl: "/dashboard" });
  };

  const handleSignOut = async () => {
    try {
      if (session?.user) {
        await fetch("/api/logAction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: {
              id: session.user.id,
              name: session.user.name,
              email: session.user.email,
              login: session.user.login,
            },
            action: "logout",
            details: {},
          }),
        });
      }
    } catch (err) {
      console.error("Error logging logout:", err);
    } finally {
      await signOut({ callbackUrl: "/" });
    }
  };

  const buttonStyle =
    "inline-flex items-center justify-center px-5 py-3 rounded-full shadow-md font-semibold text-lg transition-transform duration-300";

  if (status === "loading" || isLoading) {
    return (
      <div className={`${buttonStyle} `}>
        <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading...
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className={`${buttonStyle} bg-red-100 gap-3`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard"
              className="text-blue-600 hover:underline"
              aria-label="Dashboard"
            >
              Hi, {session.user.name?.split(" ")[0] || session.user.login}
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Dashboard</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-3 py-1 rounded-full flex gap-2 items-center hover:bg-red-600"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
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
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex gap-1 items-center">
            <Github className="w-5 h-5" />
            Login with GitHub            
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Login with GitHub</p>
        </TooltipContent>
      </Tooltip>
    </button>
  );
}
