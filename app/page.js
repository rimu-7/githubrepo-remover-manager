"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Features from "./components/Features";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="text-center py-24">
      <Features/>
    </div>
  );
}
