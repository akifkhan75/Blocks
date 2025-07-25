import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

type LoaderSize = 'sm' | 'md' | 'lg';
type LoaderVariant = 'spinner' | 'dots' | 'bar';

interface LoaderProps {
  size?: LoaderSize;
  variant?: LoaderVariant;
  color?: string;
}

const getSize = (size: LoaderSize) => {
  switch (size) {
    case 'sm': return 'small';
    case 'md': return 'medium';
    case 'lg': return 'large';
    default: return 'medium';
  }
};

const LoaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  variant = 'spinner',
  color,
}) => {
  if (variant === 'spinner') {
    return (
      <LoaderContainer>
        <ActivityIndicator 
          size={getSize(size)} 
          color={color || theme.colors.primary} 
        />
      </LoaderContainer>
    );
  }

  // Implement other variants (dots, bar) as needed
  return null;
};