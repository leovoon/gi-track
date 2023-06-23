import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type useThemeReturn = [string, (theme: Theme) => void];

export const useTheme = (initialTheme: Theme): useThemeReturn => {
  const [theme, setThemeMode] = useState<Theme>(initialTheme);

  function setTheme(theme: Theme) {
    setThemeMode(theme);
  }

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    theme === "system" && setThemeMode(systemTheme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return [theme, setTheme];
};
