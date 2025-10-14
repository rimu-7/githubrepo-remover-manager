"use client";

import { useEffect, useState } from "react";
import {
  Shield,
  GitBranch,
  Users,
  Trash2,
  CheckCircle,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AuthButtons from "./AuthButtons";
import { motion } from "framer-motion";

export default function Home2() {
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
        "A clean view of all your GitHub repositories — complete with stars, forks, and visibility info.",
      gradient: "from-sky-500 via-indigo-500 to-purple-500",
    },
    {
      icon: <Trash2 className="w-8 h-8" />,
      title: "Safe Bulk Deletion",
      description:
        "Delete multiple repositories securely with built-in confirmation to avoid accidents.",
      gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Smart Selection",
      description:
        "Select and manage multiple repositories at once — effortless and efficient.",
      gradient: "from-emerald-500 via-green-500 to-lime-400",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description:
        "Visualize key metrics like stars, forks, and growth trends at a glance.",
      gradient: "from-amber-400 via-orange-500 to-red-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "OAuth Secure",
      description:
        "All actions occur directly via GitHub OAuth — your credentials remain safe.",
      gradient: "from-blue-500 via-indigo-500 to-cyan-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "For Teams",
      description:
        "Ideal for teams managing complex repositories — efficient, collaborative.",
      gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="relative z-10">
      {/* 🌟 Hero */}
      <section className="py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-10 px-4 py-3 text-3xl font-bold">
            ⭐ {stars ?? "Loading..."}
          </span>

          <h1 className="text-5xl mt-5 md:text-5xl  mx-auto font-bold mb-6 leading-tight bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
            Manage GitHub Repositories Like a Pro
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 ">
            A secure, powerful dashboard to organize, delete, and analyze your
            GitHub repositories — cleanly and safely.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Card className=" backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-6 shadow-2xl">
              <AuthButtons />
            </Card>
          </div>
        </motion.div>
      </section>

      {/* ⚙️ Features */}
      <section className="py-24">
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
    </div>
  );
}
