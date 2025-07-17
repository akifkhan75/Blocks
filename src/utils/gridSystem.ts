import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const getCurrentBreakpoint = (): Breakpoint => {
  if (width < 576) return 'xs';
  if (width < 768) return 'sm';
  if (width < 992) return 'md';
  if (width < 1200) return 'lg';
  return 'xl';
};

export const gridResponsiveStyles = (size: number | { [key in Breakpoint]?: number }) => {
  if (typeof size === 'number') {
    return {
      flex: size > 0 ? size : 0,
      maxWidth: `${(size / 12) * 100}%`,
    };
  }

  const breakpoint = getCurrentBreakpoint();
  const currentSize = size[breakpoint] || 12; // Default to full width

  return {
    flex: currentSize > 0 ? currentSize : 0,
    maxWidth: `${(currentSize / 12) * 100}%`,
  };
};

export const getColumnCount = (): number => {
  const breakpoint = getCurrentBreakpoint();
  switch (breakpoint) {
    case 'xs': return 4;
    case 'sm': return 6;
    case 'md': return 8;
    case 'lg': return 12;
    case 'xl': return 12;
    default: return 12;
  }
};