import React from 'react';
import styled from 'styled-components/native';
import { ImageBackground, View, ImageSourcePropType, Platform } from 'react-native';
import { Text } from '../Typography/Text';

type CardVariant = 'basic' | 'media' | 'glass' | 'stats' | 'product' | 'notification';
type CardElevation = 'none' | 'low' | 'medium' | 'high';

interface CardProps {
  variant?: CardVariant;
  elevation?: CardElevation;
  intensity?: number; // For glass effect
  children?: React.ReactNode;
  style?: any;
}

interface CardImageProps {
  source: ImageSourcePropType;
  height?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

interface CardContentProps {
  padding?: number;
  children?: React.ReactNode;
}

// Base Card Container
const CardContainer = styled(View)<{ 
  variant: CardVariant;
  elevation: CardElevation;
  intensity?: number;
}>`
  border-radius: ${({ theme }) => theme.borders.radius.md}px;
  overflow: hidden;
  background-color: ${({ variant, theme }) => 
    variant === 'glass' ? 'transparent' : theme.colors.background};
  
  ${({ elevation, theme }) => {
    switch (elevation) {
      case 'low':
        return `
          shadow-color: ${theme.colors.text};
          shadow-offset: 0px 2px;
          shadow-opacity: 0.1;
          shadow-radius: 4px;
          elevation: 2;
        `;
      case 'medium':
        return `
          shadow-color: ${theme.colors.text};
          shadow-offset: 0px 4px;
          shadow-opacity: 0.2;
          shadow-radius: 6px;
          elevation: 4;
        `;
      case 'high':
        return `
          shadow-color: ${theme.colors.text};
          shadow-offset: 0px 8px;
          shadow-opacity: 0.3;
          shadow-radius: 8px;
          elevation: 8;
        `;
      default:
        return '';
    }
  }}

  ${({ variant, intensity = 10 }) => 
    variant === 'glass' && Platform.OS === 'ios' ? `
      backdrop-filter: blur(${intensity}px);
      background-color: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
    ` : ''}
`;

// Card Image Component
const StyledImage = styled(ImageBackground)<{ height?: number }>`
  width: 100%;
  height: ${({ height }) => height || 200}px;
  justify-content: flex-end;
`;

// Card Content Component
const ContentContainer = styled(View)<{ padding?: number }>`
  padding: ${({ padding = 16 }) => padding}px;
`;

// Main Card Component
export const Card: React.FC<CardProps> & {
  Image: React.FC<CardImageProps>;
  Content: React.FC<CardContentProps>;
} = ({ 
  variant = 'basic', 
  elevation = 'medium', 
  intensity,
  children,
  style,
}) => {
  return (
    <CardContainer 
      variant={variant}
      elevation={elevation}
      intensity={intensity}
      style={style}
    >
      {children}
    </CardContainer>
  );
};

// Card.Image subcomponent
Card.Image = ({ source, height, resizeMode = 'cover' }) => {
  return (
    <StyledImage 
      source={source} 
      height={height}
      resizeMode={resizeMode}
    />
  );
};

// Card.Content subcomponent
Card.Content = ({ padding, children }) => {
  return (
    <ContentContainer padding={padding}>
      {children}
    </ContentContainer>
  );
};