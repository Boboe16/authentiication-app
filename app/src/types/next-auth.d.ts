import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Default user ID
      name?: string;
      email?: string;
      image?: string;
      redirectTo?: string;
    };
  }

  interface User {
    id: string;
  }
}
