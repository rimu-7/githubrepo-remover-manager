import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "./_utils/Navbar";
import Footer from "./_utils/Footer";
import { Providers } from "./SessionProvider";
import { ThemeProvider } from "./_utils/theme-provider";
import { metalMania } from "@/lib/fonts";

export const metadata = {
  title: "GitHub Repository Manager",
  description:
    "Manage, delete, and monitor your GitHub repositories with an elegant and secure dashboard.",
  keywords: [
    "GitHub",
    "Repository Manager",
    "Dashboard",
    "Developer Tools",
    "Open Source",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  const backgroundPatternStyle = {
    backgroundImage: `
      repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.05) 0, rgba(0, 0, 0, 0.05) 2px, transparent 2px, transparent 30px),
      repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.03) 0, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 25px)
    `,
    backgroundSize: "40px 40px",
  };

  const darkBackgroundPatternStyle = {
    backgroundImage: `
      repeating-linear-gradient(45deg, rgba(255, 20, 147, 0.1) 0, rgba(255, 20, 147, 0.1) 2px, transparent 2px, transparent 30px),
      repeating-linear-gradient(-45deg, rgba(0, 255, 255, 0.08) 0, rgba(0, 255, 255, 0.08) 1px, transparent 1px, transparent 25px)
    `,
    backgroundSize: "40px 40px",
  };

  return (
    <html lang="en" className={metalMania.variable} suppressHydrationWarning>
      <body
        className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-200 font-sans"
        suppressHydrationWarning
      >
        {/* Background Patterns */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 z-0 opacity-95 dark:hidden"
            style={backgroundPatternStyle}
          />
          <div
            className="absolute inset-0 z-0 dark:block hidden"
            style={darkBackgroundPatternStyle}
          />
        </div>

        {/* Main Layout */}
        <div className="min-h-screen w-full relative z-10 flex flex-col">
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="theme"
            >
              <Toaster position="top-center" richColors closeButton />
              <header >
                <Navbar />
              </header>
              <main
                role="main"
                className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 text-gray-800 dark:text-gray-100 transition-colors duration-200 flex-1 w-full"
              >
                {children}
              </main>
              <footer className="z-10 transition-colors duration-200 w-full">
                <Footer />
              </footer>
            </ThemeProvider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
