import User from "@/app/_utils/UserSchema";
import { dbConnect } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// Patch openid-client timeout globally
import { Issuer } from "openid-client";
Issuer.defaultHttpOptions = { timeout: 10000 };

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 10000,
      },
      authorization: {
        params: {
          scope: "read:user user:email repo delete_repo",
        },
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "github") {
        token.accessToken = account.access_token;
        token.githubId = profile?.id;
        if (profile) {
          token.login = profile.login;
          token.name = profile.name;
          token.email = profile.email;
        }
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.id;
        session.user.login = token.login;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      if (account?.provider !== "github") {
        return true;
      }

      try {
        await dbConnect();

        const email = user.email || profile?.email || `${profile?.login}@github.placeholder.com`;
        const name = user.name || profile?.name || profile?.login || 'GitHub User';

        if (!email) {
          console.error("No email available for GitHub user");
          return false;
        }

        const existingUser = await User.findOne({ email });
        
        if (!existingUser) {
          await User.create({
            name,
            email,
            password: await bcrypt.hash(
              Math.random().toString(36).slice(-8) + Date.now().toString(),
              10
            ),
            provider: 'github',
            githubId: profile?.id,
          });
          console.log("New user created for GitHub login:", email);
        } else {
          console.log("Existing user found:", email);
        }

        return true;
      } catch (error) {
        console.error("SignIn Callback Error:", error);
        return true; // Allow login even if DB fails
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };