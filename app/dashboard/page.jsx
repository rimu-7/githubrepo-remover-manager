// app/dashboard/page.js
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Dashboard from "../components/Dashborad";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Redirect if not authenticated
  if (!session) {
    redirect("/api/auth/signin");
  }

  return <Dashboard />;
}
