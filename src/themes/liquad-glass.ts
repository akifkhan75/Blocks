import { LightTheme } from './light';

export const LiquidGlassTheme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    background: 'rgba(242, 242, 247, 0.8)',
    glassEffect: 'rgba(255, 255, 255, 0.4)',
    cardBackground: 'rgba(255, 255, 255, 0.7)',
  },
};