import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      token: string;
      role: string;
    };
  }
  interface User {
    id: string;
    token: string;
    role: string;
  }
}
