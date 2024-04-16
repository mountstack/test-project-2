import prisma from './db'; 
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google"; 

export const authOptions = { 
    adapter: PrismaAdapter(prisma), 
    providers: [ 
        GoogleProvider({ 
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }) 
    ] 
} 


