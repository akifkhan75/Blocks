import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');

  const handleDimensionChange = ({ window }: { window: ScaledSize }) => {
    const width = window.width;
    let newBreakpoint: Breakpoint = 'xs';

    if (width >= breakpoints.xl) {
      newBreakpoint = 'xl';
    } else if (width >= breakpoints.lg) {
      newBreakpoint = 'lg';
    } else if (width >= breakpoints.md) {
      newBreakpoint = 'md';
    } else if (width >= breakpoints.sm) {
      newBreakpoint = 'sm';
    }

    if (newBreakpoint !== breakpoint) {
      setBreakpoint(newBreakpoint);
    }
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', handleDimensionChange);
    handleDimensionChange({ window: Dimensions.get('window') });
    return () => subscription.remove();
  }, []);

  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
  const isTablet = breakpoint === 'md';
  const isDesktop = breakpoint === 'lg' || breakpoint === 'xl';

  return {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
  };
};