// src/components/Spacer/Spacer.tsx
import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

interface SpacerProps {
  size?: number | string;
  horizontal?: boolean;
}

const SpacerView = styled(View)<SpacerProps>`
  ${({ horizontal, size = 16 }) => 
    horizontal 
      ? `width: ${typeof size === 'number' ? `${size}px` : size};` 
      : `height: ${typeof size === 'number' ? `${size}px` : size};`}
`;

export const Spacer: React.FC<SpacerProps> = (props) => {
  return <SpacerView {...props} />;
};

