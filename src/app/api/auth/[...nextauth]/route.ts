// app/api/auth/[...nextauth]/route.ts
import { authOptions } from "@/lib/auth/auth";
import NextAuth from "next-auth";
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
