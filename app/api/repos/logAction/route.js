import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/app/_utils/UserSchema";
import { dbConnect } from "@/lib/mongodb";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) return res.status(401).json({ message: "Unauthorized" });

  if (req.method === "POST") {
    const { repoName, action } = req.body;
    if (!repoName || !["create", "update", "delete"].includes(action)) {
      return res.status(400).json({ message: "Invalid request" });
    }

    await dbConnect();

    try {
      const user = await User.findByEmail(session.user.email);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.repoActions.push({ repoName, action });
      await user.save();

      return res.status(200).json({ message: "Action logged" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
