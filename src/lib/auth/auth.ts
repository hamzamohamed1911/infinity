/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Academy, CustomSession, CustomUser } from "../schemas/types/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          throw new Error("يرجى إدخال رقم الهاتف وكلمة المرور");
        }

        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL;

          const res = await fetch(` ${API_URL}api/v1/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: credentials.phone,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (!res.ok || !data.data) {
            throw new Error(data.message || "فشل تسجيل الدخول");
          }

          return {
            id: data.data.id.toString(),
            phone: data.data.phone,
            name: data.data.name || null,
            email: data.data.email || null,
            wallet: data.data.wallet ?? null,
            device_id: data.data.device_id ?? null,
            national_id: data.data.national_id ?? null,
            token: data.data.token,
            academy: data.data.academy,
          } as CustomUser;
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : "خطأ في الاتصال بالخادم";
          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token.id = customUser.id;
        token.phone = customUser.phone;
        token.name = customUser.name;
        token.email = customUser.email;
        token.wallet = customUser.wallet;
        token.device_id = customUser.device_id;
        token.national_id = customUser.national_id;
        token.token = customUser.token;
        token.academy = customUser.academy;
      }
      return token;
    },
    async session({ session, token }) {
      const customSession = session as CustomSession;
      if (token) {
        customSession.user = {
          id: token.id as string,
          phone: token.phone as string,
          name: token.name || null,
          email: token.email || null,
          wallet: token.wallet as number | null,
          device_id: token.device_id as string | null,
          national_id: token.national_id as string | null,
          token: token.token as string,
          academy: token.academy as Academy,
        };
      }
      return customSession;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
