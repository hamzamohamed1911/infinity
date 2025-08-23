// app/logout/page.tsx
import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth";

export default async function LogoutPage() {
  await signOut({ redirect: false });
  redirect("/login");
}
