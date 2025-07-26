// src/components/Stack/Stack.tsx
import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

type StackDirection = 'vertical' | 'horizontal';

interface StackProps {
  direction?: StackDirection;
  spacing?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  wrap?: boolean;
  children?: React.ReactNode;
}

const StackContainer = styled(View)<StackProps>`
  flex-direction: ${({ direction }) => direction === 'horizontal' ? 'row' : 'column'};
  align-items: ${({ align, direction }) => 
    align === 'start' ? 'flex-start' :
    align === 'end' ? 'flex-end' :
    align === 'center' ? 'center' :
    direction === 'horizontal' ? 'center' : 'stretch'};
  justify-content: ${({ justify }) => 
    justify === 'start' ? 'flex-start' :
    justify === 'end' ? 'flex-end' :
    justify === 'center' ? 'center' :
    justify === 'space-between' ? 'space-between' :
    justify === 'space-around' ? 'space-around' : 'flex-start'};
  flex-wrap: ${({ wrap }) => wrap ? 'wrap' : 'nowrap'};
  gap: ${({ spacing = 0 }) => spacing}px;
`;

export const Stack: React.FC<StackProps> = ({
  direction = 'vertical',
  spacing = 0,
  align,
  justify,
  wrap = false,
  children,
}) => {
  return (
    <StackContainer
      direction={direction}
      spacing={spacing}
      align={align}
      justify={justify}
      wrap={wrap}
    >
      {children}
    </StackContainer>
  );
};