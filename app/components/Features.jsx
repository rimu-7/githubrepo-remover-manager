"use client";

import { useEffect, useState } from "react";
import {
  Shield,
  GitBranch,
  Users,
  Trash2,
  Database,
  Layers,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AuthButtons from "./AuthButtons";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Features() {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/rimu-7/githubrepo-remover-manager"
        );
        const data = await res.json();
        if (data.stargazers_count !== undefined)
          setStars(data.stargazers_count);
      } catch (err) {
        console.error("Failed to fetch stars:", err);
      }
    }
    fetchStars();
  }, []);

  const features = [
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Repository Overview",
      description:
        "A clean view of all your GitHub repositories — stars, forks, visibility, and size at a glance.",
      gradient: "from-sky-500 via-indigo-500 to-purple-500",
    },
    {
      icon: <Trash2 className="w-8 h-8" />,
      title: "Safe Bulk Deletion",
      description:
        "Select multiple repositories and delete them securely with confirmation to prevent mistakes.",
      gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Skeleton Loading",
      description:
        "Smooth loading state with skeleton placeholders for a polished user experience.",
      gradient: "from-cyan-400 via-blue-500 to-indigo-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "OAuth Secure",
      description:
        "All actions occur via GitHub OAuth — your credentials are safe and never stored.",
      gradient: "from-blue-500 via-indigo-500 to-cyan-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Friendly",
      description:
        "Ideal for teams managing multiple repos — collaborate efficiently with shared workflows.",
      gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Detailed Repo Metrics",
      description:
        "View every repo’s stars, forks, size (MB), and creation date for smarter decisions.",
      gradient: "from-lime-400 via-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="relative z-10">
      {/* 🌟 Hero Section */}
      <section className=" text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Star Count */}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href="https://github.com/rimu-7/githubrepo-remover-manager"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 font-semibold text-lg shadow-md"
                >
                  ⭐ {stars ?? "Loading..."} stars on GitHub
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Colaborate here</p>
                <p>https://github.com/rimu-7/githubrepo-remover-manager</p>
              </TooltipContent>
            </Tooltip>

            <AuthButtons />
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-snug tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-400 to-purple-500">
            Manage Your GitHub Repositories Effortlessly
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl rounded-xl border backdrop-blur-sm px-4 py-2 text-gray-700 dark:text-gray-300 mb-6">
            A secure and intuitive dashboard to view, analyze, and manage all
            your GitHub repositories in one place. Quickly see stars, forks,
            size, and creation dates, select multiple repositories, and delete
            them safely with confirmation prompts.
          </p>

          {/* Additional Description */}
          <p className="text-md md:text-lg rounded-xl border backdrop-blur-sm px-4 py-2 text-gray-600 dark:text-gray-400 mb-8">
            Built for developers and teams, this app integrates directly with
            GitHub via OAuth. Your credentials remain private, and all actions
            happen securely without storing any sensitive data. The interface is
            fully responsive, supports dark mode, and provides detailed metrics
            to help you make informed decisions.
          </p>
        </motion.div>
      </section>

      {/* ⚙️ Features */}
      <section className="py-24 px-4">
        <div className="container mx-auto ">
          <div className="text-center flex flex-col gap-4">
            <span className="mb-4 px-5 py-3 text-5xl  font-bold text-indigo-500 dark:text-indigo-300">
              ✨ Features
            </span>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-300 to-sky-400 bg-clip-text text-transparent">
              What Makes It Special
            </h2>
            <p className="text-lg text-gray-700 mb-10 dark:text-gray-400 max-w-3xl mx-auto">
              Developer-focused tools that make repository management simple,
              fast, and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group bg-white/5 border border-white/10 hover:border-indigo-400/40 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20 backdrop-blur-md">
                  <CardContent className="p-6">
                    <div
                      className={`inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-4 group-hover:scale-110 transition-transform`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* 📝 About This App */}
      <section className="">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
            About This App
          </h2>
          <p className="text-lg backdrop-blur-sm rounded-xl border px-4 py-2 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            This application is designed to help developers manage their GitHub
            repositories efficiently and securely. With GitHub OAuth
            integration, you can view all your repositories, analyze key
            metrics, and safely delete single or multiple repositories at once.
            The dashboard sorts repositories from latest to oldest, displays
            stars, forks, size, creation dates, and allows you to take informed
            actions quickly.
          </p>
          <p className="text-lg backdrop-blur-sm rounded-xl border px-4 py-2 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Features like bulk deletion confirmation, skeleton loading states,
            and a clean, responsive interface ensure a smooth and safe
            experience. This app is ideal for solo developers or teams managing
            multiple repositories, helping maintain organization, optimize
            workflow, and prevent accidental data loss.
          </p>
          <p className="text-lg backdrop-blur-sm px-4 py-2  rounded-xl border text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Everything runs directly through GitHub OAuth, so your credentials
            remain secure and are never stored on our servers. The app is fully
            responsive, supports dark mode, and offers a polished UI with
            detailed repository insights.
          </p>
        </div>
      </section>
    </div>
  );
}
