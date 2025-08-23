// app/(auth)/logout/page.tsx
export const dynamic = "force-dynamic";

import { signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LogoutPage() {
  await signOut({ redirect: false });
  redirect("/login");
}
