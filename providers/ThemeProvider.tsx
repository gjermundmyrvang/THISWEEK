import { createContext, useContext } from "react";
import { useColorScheme } from "react-native";

const colors = {
  light: {
    background: "#fafafa",
    titleText: "#1d1d1d",
    labelText: "#6b6b6b",
    placeholderText: "#b0b0b0",
    border: "#d4d4d4",
  },
  dark: {
    background: "#1a1a1a",
    titleText: "#f0f0f0",
    labelText: "#a0a0a0",
    placeholderText: "#666666",
    border: "#3a3a3a",
  },
};

const ThemeContext = createContext(colors.light);

export function ThemeProvider({ children }: React.PropsWithChildren) {
  const scheme = useColorScheme() ?? "light";
  console.log(scheme);
  const theme = colors[scheme];

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
