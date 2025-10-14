import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { Issuer } from "openid-client";

// Prevent openid-client timeout issues
Issuer.defaultHttpOptions = { timeout: 10000 };

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: { timeout: 10000 },
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "github") {
        token.accessToken = account.access_token;
        token.githubId = profile?.id;
        token.login = profile?.login;
        token.name = profile?.name;
        token.email = profile?.email;
      }

      if (user) token.id = user.id;
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

    async signIn({ account, profile }) {
      // Allow all GitHub logins (no DB)
      if (account?.provider === "github") {
        if (!profile?.email && !profile?.login) {
          console.error("GitHub user missing email or login");
          return false;
        }
        return true;
      }
      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
