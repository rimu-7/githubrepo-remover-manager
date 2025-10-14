"use client";

import { motion } from "framer-motion";
import { Star, GitFork, Calendar, HardDrive } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

/** Loading skeleton placeholder for repos */
export function RepoSkeleton() {
  return (
    <div className="p-5 rounded-2xl border bg-white dark:bg-gray-800 animate-pulse">
      <Skeleton className="h-5 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

/** Repo card displaying repo data */
export default function RepoCard({ repo, isSelected, onSelect }) {
  if (!repo) return <RepoSkeleton />;

  return (
    <motion.div
      layout
      onClick={onSelect}
      className={`p-5 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all ${
        isSelected
          ? "bg-red-100 border-red-400  dark:bg-red-950"
          : ""
      }`}
    >
      <h2 className="font-semibold text-lg mb-2">{repo.name}</h2>
      <p className="text-sm text-gray-500 mb-3">
        {repo.description || "No description provided."}
      </p>

      <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
        <span className="flex items-center gap-1">
          <Star size={16} /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork size={16} /> {repo.forks_count}
        </span>
        <span className="flex items-center gap-1">
          <HardDrive size={16} /> {(repo.size / 1024).toFixed(2)} MB
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={16} />{" "}
          {new Date(repo.created_at).toLocaleDateString()}
        </span>
      </div>
    </motion.div>
  );
}
