import { createContext } from 'react';
import { LightTheme } from '../themes/light';

export type ThemeType = typeof LightTheme;
export type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  setTheme: () => {},
});