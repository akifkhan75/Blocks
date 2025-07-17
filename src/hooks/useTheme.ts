import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a BlocksProvider');
  }
  return context;
};