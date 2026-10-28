import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AppContextValue, Settings } from "../types";

const defaultSettings: Settings = { showEmail: true, showProjects: true, language: "et" };
const AppContext = createContext<AppContextValue>({
  theme: "light",
  toggleTheme: () => undefined,
  settings: defaultSettings,
  setSettings: () => undefined,
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  // theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // settings – laeme localStoragest või kasutame default väärtuseid
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem("settings");
    return saved
      ? JSON.parse(saved)
      : defaultSettings;
  });

  // iga kord kui settings muutub, salvestame localStorage'i
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <AppContext.Provider value={{ theme, toggleTheme, settings, setSettings }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
export default AppContext;
