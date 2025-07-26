// src/components/Icon/Icon.tsx
import React from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface IconProps {
  name: string;
  size?: IconSize | number;
  color?: string;
}

const sizeMap = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

const IconWrapper = styled(MaterialIcons).attrs<IconProps>(({ theme, color, size = 'md' }) => ({
  color: color || theme.colors.text,
  size: typeof size === 'string' ? sizeMap[size] : size,
}))<IconProps>``;

export const Icon: React.FC<IconProps> = (props) => {
  return <IconWrapper {...props} />;
};
