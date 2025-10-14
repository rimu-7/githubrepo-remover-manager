"use client";

import Link from "next/link";
import { Github, Twitter, Mail, UserCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-gray-300 backdrop-blur-xs dark:border-gray-700  transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
              GitHub Repo Manager
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-md">
              A powerful tool for developers to efficiently manage their GitHub repositories. 
              Built with modern web technologies and best practices.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/rimu-7" },
                { icon: Twitter, href: "https://x.com/__rimu7_?t=mR45Sbs06Kh-AeET2V-oFw&s=09" },
                { icon: Mail, href: "mailto:rimux0x@proton.me" },
                { icon: UserCircle, href: "https://rimubhai.vercel.app", external: true },
              ].map(({ icon: Icon, href, external }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target={external ? "_blank" : "_self"}
                  rel={external ? "noopener noreferrer" : ""}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 transform hover:-translate-y-1 hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 transition-colors duration-300">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Dashboard", href: "/dashboard" },
                { name: "GitHub Docs", href: "https://docs.github.com", external: true },
              ].map(({ name, href, external }, idx) => (
                <li key={idx}>
                  <a
                    href={href}
                    target={external ? "_blank" : "_self"}
                    rel={external ? "noopener noreferrer" : ""}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 transform hover:translate-x-1"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 transition-colors duration-300">
              Support
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Contact Support", href: "mailto:support@repomanager.com" },
              ].map(({ name, href }, idx) => (
                <li key={idx}>
                  <a
                    href={href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 transform hover:translate-x-1"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-300 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
            © {currentYear} GitHub Repo Manager. All rights reserved Rimu Bhai.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 md:mt-0 transition-colors duration-300">
            Built with ❤️ for the developer community
          </p>
        </div>
      </div>
    </footer>
  );
}