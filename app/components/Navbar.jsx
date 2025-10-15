"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import AuthButtons from "./AuthButtons";
import { Menu, X, Github } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b backdrop-blur-md sticky top-0 z-50 w-full">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-xl flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Github className="w-6 h-6" />
          <span className="hidden sm:inline">GitHub Repo Manager</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          <AuthButtons />
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden border-t backdrop-blur-md">
          <div className="flex items-center gap-4 px-6 py-4 animate-slideDown">
            <AuthButtons />
            <ModeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
