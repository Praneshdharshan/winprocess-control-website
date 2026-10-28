import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

const STORAGE_KEY = "wp-theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_KEY) || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
