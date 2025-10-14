import "./globals.css";
import Navbar from "./components/Navbar";
import Providers from "./Providers";
import { ThemeProvider } from "./components/theme-provider";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

export const metadata = {
  title: "GitHub Repo Manager",
  description: "Manage your GitHub repositories securely using NextAuth.js",
};

export default function RootLayout({ children }) {
  const backgroundPatternStyle = {
    backgroundImage: `
      repeating-linear-gradient(45deg, rgba(255, 20, 147, 0.1) 0, rgba(255, 20, 147, 0.1) 3px, transparent 2px, transparent 30px),
      repeating-linear-gradient(-45deg, rgba(10, 10, 10, 0.01) 0, rgba(10, 10, 10, 0.95) 1px, transparent 1px, transparent 25px)
    `,
    backgroundSize: "40px 40px",
  };

  const darkBackgroundPatternStyle = {
    backgroundImage: `
      repeating-linear-gradient(45deg, rgba(255, 20, 147, 0.5) 0, rgba(255, 20, 147, 0.1) 2px, transparent 2px, transparent 30px),
      repeating-linear-gradient(-45deg, rgba(0, 255, 255, 0.8) 0, rgba(0, 255, 255, 0.08) 1px, transparent 1px, transparent 25px)
    `,
    backgroundSize: "40px 40px",
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body className="antialiased bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-50">
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
          <Providers>
            <Navbar />
            <main className="container mx-auto p-6">
              <Toaster richColors closeButton position="top-center" />
              {children}
            </main>
            <Footer />
          </Providers>
        </body>
      </ThemeProvider>
    </html>
  );
}
