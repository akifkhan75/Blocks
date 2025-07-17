import React, { ReactNode, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeContext, ThemeType } from './ThemeContext';
import { LightTheme } from '../themes/light';
import { I18nManager, Platform } from 'react-native';

interface BlocksProviderProps {
  theme?: ThemeType;
  rtl?: boolean;
  children: ReactNode;
}

export const BlocksProvider = ({
  theme = LightTheme,
  rtl = false,
  children,
}: BlocksProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(theme);

  // Handle RTL if needed
  if (rtl && !I18nManager.isRTL && Platform.OS === 'android') {
    I18nManager.forceRTL(true);
  }

  const contextValue = useMemo(
    () => ({ theme: currentTheme, setTheme: setCurrentTheme }),
    [currentTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={currentTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};