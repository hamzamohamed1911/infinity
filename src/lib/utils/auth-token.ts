import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth";
import { CustomSession } from "../schemas/types/auth";

export async function getAuthToken() {
  const session = await getServerSession(authOptions) as CustomSession | null;

  const token = session?.user.token;
  return token;
}
