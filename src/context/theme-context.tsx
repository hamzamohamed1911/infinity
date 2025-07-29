"use client";

import { createContext, useContext } from "react";

export type ThemeConfig = {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  logo: string;
  teacherImage: string;
  appName: string;
};

const ThemeContext = createContext<ThemeConfig | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

export const ThemeProvider = ({
  value,
  children,
}: {
  value: ThemeConfig;
  children: React.ReactNode;
}) => {
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
