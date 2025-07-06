import { useContext } from "react";
import { ThemeProviderContext } from "./use-theme";


export function useTheme() {
  return useContext(ThemeProviderContext);
}