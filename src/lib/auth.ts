// lib/auth.ts
import NextAuth from "next-auth";
import { authOptions } from "./auth/auth";

// هنا بنعمل export لـ helpers
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
