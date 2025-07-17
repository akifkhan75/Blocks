import React from 'react';
import styled from 'styled-components';
import { View, ViewProps } from 'react-native';

type CardVariant = 'elevated' | 'outline' | 'glass' | 'filled';

interface CardProps extends ViewProps {
  variant?: CardVariant;
  children: React.ReactNode;
}

const CardContainer = styled(View)<CardProps>`
  border-radius: ${({ theme }) => theme.borders.radius.md};
  overflow: hidden;
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'elevated':
        return `
          background-color: ${theme.colors.cardBackground};
          ${theme.shadows.md}
        `;
      case 'outline':
        return `
          background-color: ${theme.colors.cardBackground};
          border-width: ${theme.borders.width.thin};
          border-color: ${theme.colors.muted};
        `;
      case 'glass':
        return `
          background-color: ${theme.colors.glassEffect || 'rgba(255, 255, 255, 0.4)'};
          backdrop-filter: blur(10px);
          border-width: ${theme.borders.width.thin};
          border-color: rgba(255, 255, 255, 0.2);
        `;
      case 'filled':
        return `
          background-color: ${theme.colors.cardBackground};
        `;
      default:
        return '';
    }
  }}
`;

export const Card = ({
  variant = 'elevated',
  children,
  ...props
}: CardProps) => {
  return (
    <CardContainer variant={variant} {...props}>
      {children}
    </CardContainer>
  );
};