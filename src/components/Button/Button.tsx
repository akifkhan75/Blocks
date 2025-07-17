import React from 'react';
import styled from 'styled-components';
import { ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { useHaptic } from '../../hooks/useHaptic';
import { Text } from '../Typography/Text';

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'glass' | 'fab';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  haptic?: 'light' | 'medium' | 'heavy';
  children: React.ReactNode;
  onPress?: () => void;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ButtonContainer = styled(TouchableOpacity)<ButtonProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borders.radius.md}px;
  padding: ${({ theme, size = 'md' }) => {
    const spacing = theme.spacing;
    if (size === 'sm') return `${spacing['2']}px ${spacing['3']}px`;
    if (size === 'md') return `${spacing['3']}px ${spacing['4']}px`;
    return `${spacing['4']}px ${spacing['5']}px`;
  }};
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  
  ${({ variant = 'solid', theme }) => {
    switch (variant) {
      case 'solid':
        return `background-color: ${theme.colors.primary};`;
      case 'outline':
        return `
          background-color: transparent;
          border-width: ${theme.borders.width.thin}px;
          border-color: ${theme.colors.primary};
        `;
      case 'ghost':
        return `background-color: transparent;`;
      case 'glass':
        return `
          background-color: ${theme.colors.glassEffect || 'rgba(255, 255, 255, 0.4)'};
          ${Platform.OS === 'ios' ? 'backdrop-filter: blur(10px);' : ''}
        `;
      case 'fab':
        return `
          background-color: ${theme.colors.primary};
          border-radius: ${theme.borders.radius.full}px;
          width: 56px;
          height: 56px;
          padding: 0;
          justify-content: center;
          align-items: center;
          shadow-color: #000;
          shadow-offset: 0 4px;
          shadow-opacity: 0.3;
          shadow-radius: 4px;
          elevation: 4;
        `;
      default:
        return '';
    }
  }}
`;

interface ButtonTextProps extends Pick<ButtonProps, 'variant' | 'size'> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ButtonText = styled(Text)<ButtonTextProps>`
  color: ${({ variant = 'solid', theme }) =>
    variant === 'solid' || variant === 'fab' ? '#FFFFFF' : theme.colors.primary};
  font-size: ${({ size = 'md', theme }) =>
    size === 'sm'
      ? theme.typography.fontSize.sm
      : size === 'md'
      ? theme.typography.fontSize.md
      : theme.typography.fontSize.lg}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  ${({ leftIcon }) => leftIcon && 'margin-left: 8px;'}
  ${({ rightIcon }) => rightIcon && 'margin-right: 8px;'}
`;

export const Button = ({
  variant = 'solid',
  size = 'md',
  loading = false,
  disabled = false,
  haptic,
  children,
  onPress,
  fullWidth = false,
  leftIcon,
  rightIcon,
}: ButtonProps) => {
  const { triggerHaptic } = useHaptic();

  const handlePress = () => {
    if (haptic) triggerHaptic(haptic);
    if (onPress) onPress();
  };

  return (
    <ButtonContainer
      variant={variant}
      size={size}
      disabled={disabled || loading}
      onPress={handlePress}
      activeOpacity={0.7}
      fullWidth={fullWidth}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'solid' || variant === 'fab' ? '#FFFFFF' : undefined}
        />
      ) : (
        <>
          {leftIcon}
          <ButtonText size={size} leftIcon={leftIcon} rightIcon={rightIcon}>
            {children}
          </ButtonText>
          {rightIcon}
        </>
      )}
    </ButtonContainer>
  );
};
