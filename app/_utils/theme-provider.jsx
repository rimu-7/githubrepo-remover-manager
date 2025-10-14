"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = React.useState(false);
  const [initialTheme, setInitialTheme] = React.useState(null);

  // Synchronous check on every render until we have the theme
  React.useEffect(() => {
    if (typeof window !== "undefined" && initialTheme === null) {
      // Check localStorage synchronously
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      const themeToUse = savedTheme || (systemPrefersDark ? "dark" : "light");
      
      // Set immediately and save to localStorage
      setInitialTheme(themeToUse);
      if (!savedTheme) {
        localStorage.setItem("theme", themeToUse);
      }
    }
    setMounted(true);
  }, [initialTheme]);

  // CRITICAL: Block rendering until we have the initial theme
  if (initialTheme === null) {
    return (
      <div 
        style={{ 
          visibility: "hidden", 
          height: "100vh", 
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#ffffff" // Fallback white to prevent flash
        }} 
        suppressHydrationWarning
      />
    );
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={initialTheme}
      enableSystem
      disableTransitionOnChange
      storageKey="theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}