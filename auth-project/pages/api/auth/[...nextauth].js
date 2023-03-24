import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

const options = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials) => {
        // Add logic here to validate credentials and return user object
        const client = await connectToDatabase();
        const usersCollection = await client.db().collection("users");
        console.log(credentials);
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found");
        }
        const passIsValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!passIsValid) {
          client.close();
          throw new Error("Password is invalid");
        }

        client.close();
        return { email: user.email };
      },
    }),
    // Add additional providers as needed
  ],

  // Optional: configure database and session management
  //   database: process.env.DATABASE_URL,
  session: {
    jwt: true,
  },
};

export default (req, res) => NextAuth(req, res, options);
