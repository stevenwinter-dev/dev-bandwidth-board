import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
 
export const auth = betterAuth({
    emailAndPassword: {  
        enabled: true
    },
    socialProviders: { 
       github: { 
        clientId: process.env.GITHUB_CLIENT_ID, 
        clientSecret: process.env.GITHUB_CLIENT_SECRET, 
       } 
    }, 
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema
    }),
    plugins: [nextCookies()]
});