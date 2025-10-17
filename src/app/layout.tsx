// app/layout.tsx
import { Alexandria } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/context/Providers";
import { Toaster } from "@/components/ui/sonner";
import { getWebConfig } from "@/lib/apis/webconfig.api";

const alexandria = Alexandria({
  weight: ["400", "700"],
  variable: "--font-alexandria",
  subsets: ["arabic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const res = await getWebConfig();
  const logo = res?.data?.mobile_config?.academy_logo;
  const appName = res?.data?.mobile_config?.academy_name ?? "Infinity";
  const description = res?.data?.mobile_config?.academy_name ?? "Infinity";

  return {
    title: appName,
    description: description,
    icons: {
      icon: logo,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="rtl" lang="ar">
      <body
        className={`${alexandria.variable} h-full bg-backgroundColor font-sans relative `}
      >
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
