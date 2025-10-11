"use client";

import { ReactNode, useEffect } from "react";
import { generateColorShades } from "@/lib/utils/generateColorShades";
import { LandingPageResponse } from "@/lib/types/landing";

export default function LandingThemeProvider({
  landingData,
  children,
}: {
  landingData: LandingPageResponse;
  children: ReactNode;
}) {
  const general = landingData?.data?.academy?.web_config?.general;

  useEffect(() => {
    if (!general) return;

    const primaryColor = general.primary_color ?? "#2dc5eb";
    const secondaryColor = general.secondary_color ?? "#0067e6";

    const primaryShades = generateColorShades(primaryColor);
    const secondaryShades = generateColorShades(secondaryColor);

    const root = document.documentElement;

    Object.entries(primaryShades).forEach(([key, value]) => {
      root.style.setProperty(`--landing-primary-${key}`, value);
    });
    Object.entries(secondaryShades).forEach(([key, value]) => {
      root.style.setProperty(`--landing-secondary-${key}`, value);
    });

    root.style.setProperty("--landing-primary-color", primaryColor);
    root.style.setProperty("--landing-secondary-color", secondaryColor);
  }, [general]);

  return <>{children}</>;
}
