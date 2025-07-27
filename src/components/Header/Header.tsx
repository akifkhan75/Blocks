// src/components/Header/Header.tsx
import React from 'react';
import styled from 'styled-components/native';
import { View, Platform } from 'react-native';
import { Text } from '../Typography/Text';

type HeaderVariant = 'default' | 'transparent' | 'floating';

interface HeaderProps {
  title?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  variant?: HeaderVariant;
  showBorder?: boolean;
}

const HeaderContainer = styled(View)<{ variant: HeaderVariant, showBorder: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  height: ${Platform.OS === 'ios' ? 88 : 56}px;
  padding-top: ${Platform.OS === 'ios' ? 44 : 16}px;
  background-color: ${({ variant, theme }) => 
    variant === 'transparent' ? 'transparent' : theme.colors.primary};
  ${({ variant }) => variant === 'floating' && `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  `}
  ${({ showBorder, theme }) => showBorder && `
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.border};
  `}
`;

const HeaderTitle = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  flex: 1;
`;

export const Header: React.FC<HeaderProps> = ({
  title,
  leftContent,
  rightContent,
  variant = 'default',
  showBorder = true,
}) => {
  return (
    <HeaderContainer variant={variant} showBorder={showBorder}>
      <View>{leftContent}</View>
      {title && <HeaderTitle>{title}</HeaderTitle>}
      <View>{rightContent}</View>
    </HeaderContainer>
  );
};