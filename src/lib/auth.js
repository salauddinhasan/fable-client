import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter"; 

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db('fable_bd');

export const auth = betterAuth({
  emailAndPassword: { 
    enabled: true, 
  }, 
  database: mongodbAdapter(db),

  // প্লাগইন ছাড়া Better Auth কাস্টম ফিল্ড ডাটাবেজে নিতে চায় না
  plugins: [
    {
      id: "custom-role-plugin",
      schema: {
        user: {
          fields: {
            role: {
              type: "string",
              required: false,
              defaultValue: "user",
            },
          },
        },
      },
    },
  ],
});