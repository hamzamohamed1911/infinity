"use client";

import { getWebConfig } from "@/lib/apis/webconfig.api";
import { argbToHex } from "@/lib/utils/argbToHex";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-context";
import { ReactNode } from "react";

const queryClient = new QueryClient();

function ThemeLoader({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["web-config"],
    queryFn: getWebConfig,
  });

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-xl">جار التحميل ...</p>
      </div>
    );
  if (isError || !data?.data?.mobile_config)
    return <div>حدث خطأ أثناء تحميل الإعدادات</div>;

  const theme: Theme = {
    primaryColor: argbToHex(
      data.data.mobile_config.primary_color ?? "0xff831AD3"
    ),
    secondaryColor: argbToHex(
      data.data.mobile_config.secondary_color ?? "0xff606060",
    ),
    backgroundColor: argbToHex(
      data.data.mobile_config.background_color ?? "0xffffffff",
    ),
    logo: data.data.mobile_config?.academy_logo,
    teacherImage: data.data.mobile_config.teacher_image,
    appName: data.data.mobile_config.app_name,
  };

  // Set CSS variables
  const root = document.documentElement;
  root.style.setProperty("--primary-color", theme.primaryColor);
  root.style.setProperty("--secondary-color", theme.secondaryColor);
  root.style.setProperty("--background-color", theme.backgroundColor);

  return <ThemeProvider value={theme}>{children}</ThemeProvider>;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeLoader>{children}</ThemeLoader>
      </QueryClientProvider>
    </SessionProvider>
  );
}
