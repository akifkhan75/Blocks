// src/components/Avatar/Avatar.tsx
import React from 'react';
import styled from 'styled-components/native';
import { Image, View } from 'react-native';
import { Text } from '../Typography/Text';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  size?: AvatarSize;
  source?: { uri: string };
  initials?: string;
}

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

const AvatarContainer = styled(View)<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const AvatarImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const AvatarText = styled(Text)<{ size: number }>`
  font-size: ${({ size }) => size / 2}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  source,
  initials,
}) => {
  const avatarSize = sizeMap[size];
  
  return (
    <AvatarContainer size={avatarSize}>
      {source ? (
        <AvatarImage source={source} />
      ) : (
        <AvatarText size={avatarSize}>{initials}</AvatarText>
      )}
    </AvatarContainer>
  );
};