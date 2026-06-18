import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("fable_bd");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: { enabled: true },

  socialProviders: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    },
  },

  plugins: [
    {
      id: "custom-role-plugin",
      schema: {
        user: {
          fields: {
            role: { type: "string", required: false, defaultValue: "user" },
          },
        },
      },
    },
  ],
});
