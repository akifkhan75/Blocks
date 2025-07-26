// src/components/Divider/Divider.tsx
import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

type DividerOrientation = 'horizontal' | 'vertical';

interface DividerProps {
  orientation?: DividerOrientation;
  thickness?: number;
  color?: string;
  margin?: number;
}

const DividerLine = styled(View)<DividerProps>`
  ${({ orientation = 'horizontal' }) => 
    orientation === 'horizontal' 
      ? 'width: 100%; height: 1px;' 
      : 'width: 1px; height: 100%;'}
  background-color: ${({ color, theme }) => color || theme.colors.border};
  margin: ${({ margin = 0 }) => margin}px 0;
  ${({ thickness = 1 }) => `
    ${orientation === 'horizontal' ? 'height' : 'width'}: ${thickness}px;
  `}
`;

export const Divider: React.FC<DividerProps> = (props) => {
  return <DividerLine {...props} />;
};