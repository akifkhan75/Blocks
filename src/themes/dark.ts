import { LightTheme } from './light';

export const DarkTheme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    background: '#1C1C1E',
    text: '#FFFFFF',
    cardBackground: '#2C2C2E',
  },
};