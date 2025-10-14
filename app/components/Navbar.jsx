"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import AuthButtons from "./AuthButtons";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="border-b  backdrop-blur-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="font-bold text-xl">
          🚀 GitHub Repo Manager
        </Link>

        <div className="flex gap-4 items-center">
          {session ? (
            <>
              <AuthButtons />
            </>
          ) : (
            <AuthButtons />
          )}

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
