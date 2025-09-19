import { DefaultSession, DefaultUser } from "next-auth";
import { Academy } from "../schemas/types/auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    phone: string;
    wallet?: number | null;
    device_id?: string | null;
    national_id?: string | null;
    token: string;
    academy?: Academy;
  }

  interface Session {
    user: {
      id: string;
      phone: string;
      wallet?: number | null;
      device_id?: string | null;
      national_id?: string | null;
      token: string;
      academy?: Academy;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    phone: string;
    wallet?: number | null;
    device_id?: string | null;
    national_id?: string | null;
    token: string;
    academy?: Academy;
  }
}
