// lib/get-auth-session.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth";
import { CustomSession } from "../schemas/types/auth";

export async function getAuthSession(): Promise<CustomSession | null> {
  const session = await getServerSession(authOptions);
  return session as CustomSession | null;
}
