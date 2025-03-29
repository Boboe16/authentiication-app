// in auth.ts

import { AuthOptions, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import MongoClient from "./mongoPromise";

const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET as string,
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
          name: "credentials",
          credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials: Record<"username" | "password", string> | undefined):
           Promise<any | undefined> {
            if (!credentials) return null;            
            const bcrypt = require("bcrypt");
            
            try {
              const client = await MongoClient()
              const db = client.db("db1")
              const usersCollection = db.collection("collection1")
              const getUserData = await usersCollection.findOne({email: credentials.username})
              const validateUserPassword = await bcrypt.compare(credentials.password, getUserData.password)
              
              const user = {
                id: getUserData._id, 
                email: getUserData.email,
                name: getUserData.username,
              };
              
              if (validateUserPassword) {
                return user
              } else {
                return null
              } 
            } catch(error) {
              console.error("Something went wrong: ", error)
            }
          },
        }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }): Promise<any | undefined> {
      const client = await MongoClient();
      const db = await client.db("db1");
      const usersCollection = db.collection("collection1");
      const getUserData = await usersCollection.findOne({email: profile?.email});

      if (user) {
        token.id = user.id as string; 
        token.email = user.email as string;
        token.name = user.name as string
      };

      if (account?.provider === "google") {
        if (getUserData) {
          token.id = getUserData._id;
          token.email = getUserData.email; // Store user password in token
          if (getUserData.username) token.name = getUserData.username as string;
          token.redirectTo = "/store";
        } else if (!getUserData) {
          token.redirectTo = "/create-account";
          token.email = profile?.email;
        } else {
          return null;
        }
      };
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.email = token.email as string;
        session.user.id = token.id as string;
        session.user.redirectTo = token.redirectTo as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
}

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }