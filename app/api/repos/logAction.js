import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/app/_utils/UserSchema";
import { dbConnect } from "@/lib/mongodb";

export async function POST(req) {
  const session = await getServerSession({ req, ...authOptions });
  if (!session?.user?.email) return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });

  const { repoName, action } = await req.json();
  if (!repoName || !["create", "update", "delete"].includes(action)) {
    return new Response(JSON.stringify({ message: "Invalid request" }), { status: 400 });
  }

  await dbConnect();

  try {
    const user = await User.findByEmail(session.user.email);
    if (!user) return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });

    user.repoActions.push({ repoName, action });
    await user.save();

    return new Response(JSON.stringify({ message: "Action logged" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
