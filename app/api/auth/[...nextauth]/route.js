import User from "@/app/_utils/UserSchema";
import { dbConnect } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// Patch openid-client timeout globally
import { Issuer } from "openid-client";
Issuer.defaultHttpOptions = { timeout: 10000 }; // 10s timeout globally

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 10000, // Increase GitHub OAuth timeout
      },
      authorization: {
        params: {
          scope: "read:user user:email repo delete_repo",
        },
      },
      checks: ["pkce", "state"],
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "github") {
        token.accessToken = account.access_token;
        token.githubId = account.providerAccountId;
        if (profile) token.login = profile.login;
      }
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (!token) return session;
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.login = token.login;
      return session;
    },

    async signIn({ user, account, profile }) {
      if (account?.provider === "github") {
        try {
          await dbConnect();

          const email = user.email || `${profile.login}@github.placeholder.com`;
          const name = user.name || profile.name || profile.login;

          const existingUser = await User.findOne({ email });
          if (!existingUser) {
            await User.create({
              name,
              email,
              password: bcrypt.hashSync(
                Math.random().toString(36).slice(-8),
                10
              ),
            });
          }
        } catch (error) {
          console.error("SignIn Callback Error:", error);
          return false;
        }
      }
      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
