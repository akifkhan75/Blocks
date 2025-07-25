import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      cardBackground: string;
      error: string;
      success: string;
      warning: string;
      info: string;
      muted: string;
    };
    typography: {
      fontFamily: string;
      fontSize: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        '2xl': number;
        '3xl': number;
        '4xl': number;
      };
      fontWeight: {
        regular: string;
        medium: string;
        semibold: string;
        bold: string;
      };
    };
    spacing: {
      '0': number;
      '1': number;
      '2': number;
      '3': number;
      '4': number;
      '5': number;
      '6': number;
      '7': number;
      '8': number;
      '9': number;
      '10': number;
    };
    borders: {
      radius: {
        none: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        full: number;
      };
      width: {
        none: number;
        hairline: number;
        thin: number;
        thick: number;
      };
    };
    shadows: {
      sm: ShadowStyle;
      md: ShadowStyle;
      lg: ShadowStyle;
    };
    buttons: {
      solid: {
        backgroundColor: string;
        textColor: string;
      };
      outline: {
        borderColor: string;
        textColor: string;
      };
      glass: {
        blurAmount: number;
        overlayColor: string;
      };
    };
    input: {
      filled: {
        backgroundColor: string;
      };
    };
    zIndices: {
      hide: number;
      auto: 'auto';
      base: number;
      docked: number;
      dropdown: number;
      sticky: number;
      banner: number;
      overlay: number;
      modal: number;
      popover: number;
      toast: number;
      tooltip: number;
    };
  }
}

interface ShadowStyle {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}