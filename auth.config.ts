import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      credentials: {
        id: {},
        token: {},
        role: {},
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const user = {
          id: credentials.id as string,
          token: credentials.token,
          role: credentials.role,
        };

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...user,
          ...token,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
} satisfies NextAuthConfig;
