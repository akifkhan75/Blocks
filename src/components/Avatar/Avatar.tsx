// src/components/Avatar/Avatar.tsx
import React from 'react';
import { AvatarContainer, AvatarImage, AvatarText } from './styled';
import { AvatarProps, sizeMap } from './types';

export const Avatar: React.FC<AvatarProps> = ({
  size = sizeMap.md,
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