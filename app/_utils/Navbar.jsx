"use client";

import { useState } from "react";
import Link from "next/link";
import AuthButtons from "./AuthButtons";
import { ThemeToggle } from "./ToggleMood";
import { Menu, X, Github } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full  z-50">
      <div className="mx-auto flex justify-between backdrop-blur-xs items-center px-4 md:px-24 py-3">
        {/* 🔗 Logo using Frijole font */}
        <div className="text-xl font-semibold tracking-tight">
          <Link
            href="/"
            className="hover:text-primary flex gap-2 items-center transition-colors"
          >
            <Github className="w-12 h-12" />
            <span className="frijole-regular tracking-wider">
              Repository Manager
            </span>
          </Link>
        </div>

        {/* 💻 Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          <AuthButtons />
          <ThemeToggle />
        </div>

        {/* 📱 Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-md hover:bg-muted/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/90 backdrop-blur-md px-4 py-3 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
          <AuthButtons />
        </div>
      )}
    </nav>
  );
}
