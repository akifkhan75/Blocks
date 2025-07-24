import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { Text } from '../Typography/Text';
import { useHaptic } from '../../hooks/useHaptic';
import { ThemeType } from 'styled-components';

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'glass' | 'fab';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonShape = 'rectangle' | 'rounded' | 'pill' | 'circle';
type IconPosition = 'left' | 'right';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean,
  hapticFeedback?: 'light' | 'medium' | 'heavy';
  shape?: ButtonShape;
  children?: React.ReactNode;
  onPress?: () => void;
}

const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case 'sm': return 32;
    case 'md': return 48;
    case 'lg': return 56;
    default: return 48;
  }
};

const getBorderRadius = (shape: ButtonShape, theme: any) => {
  switch (shape) {
    case 'rounded': return theme.borders.radius.md;
    case 'pill': return theme.borders.radius.full;
    case 'circle': return theme.borders.radius.full;
    default: return theme.borders.radius.sm;
  }
};

const ButtonContainer = styled(TouchableOpacity).attrs<ButtonProps>({
  activeOpacity: 0.7,
})<ButtonProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: ${({ size = 'md' }) => getButtonSize(size)}px;
  
  ${({ shape, size = 'md' }) =>
    shape === 'circle' ? `
      width: ${getButtonSize(size)}px;
      height: ${getButtonSize(size)}px;
      border-radius: ${({ theme }) => theme.borders.radius.full}px;
    ` : `
      padding: 16px;
      border-radius: ${({ theme }) => theme.borders.radius.md}px;
    `
  }

  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  ${({ variant = 'solid', theme }: { variant?: ButtonVariant, theme: ThemeType }) => {
    switch (variant) {
      case 'solid':
        return `
          background-color: ${theme.colors.primary};
        `;
      case 'outline':
        return `
          background-color: transparent;
          border-width: ${theme.borders.width.thin}px;
          border-color: ${theme.colors.primary};
        `;
      case 'ghost':
        return `
          background-color: transparent;
        `;
      case 'glass':
        return `
          background-color: rgba(255, 255, 255, 0.2);
          ${Platform.OS === 'ios' ? 'backdrop-filter: blur(10px);' : ''}
        `;
      case 'fab':
        return `
          background-color: ${theme.colors.primary};
          box-shadow: ${theme.shadows.md.shadowColor} 
            ${theme.shadows.md.shadowOffset.width}px 
            ${theme.shadows.md.shadowOffset.height}px 
            ${theme.shadows.md.shadowRadius}px;
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
        `;
    }
  }}
`;

const ButtonText = styled(Text)<{ variant?: ButtonVariant }>`
  color: ${({ variant = 'solid', theme }: { variant?: ButtonVariant, theme: ThemeType }) =>
    variant === 'solid' || variant === 'fab' 
      ? theme.colors.text 
      : theme.colors.primary};
  margin-left: ${({ hasLeftIcon }) => hasLeftIcon ? '8px' : '0'};
  margin-right: ${({ hasRightIcon }) => hasRightIcon ? '8px' : '0'};
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  hapticFeedback,
  shape = 'rectangle',
  children,
  onPress,
}) => {
  const { triggerHaptic } = useHaptic();

  const handlePress = () => {
    if (hapticFeedback) triggerHaptic(hapticFeedback);
    if (onPress) onPress();
  };

  const hasLeftIcon = !!icon && iconPosition === 'left';
  const hasRightIcon = !!icon && iconPosition === 'right';

  return (
    <ButtonContainer
      variant={variant}
      size={size}
      disabled={disabled || loading}
      onPress={handlePress}
      shape={shape}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'solid' || variant === 'fab' 
            ? theme.colors.text 
            : theme.colors.primary}
        />
      ) : (
        <>
          {hasLeftIcon && icon}
          {children && (
            <ButtonText 
              variant={variant}
              hasLeftIcon={hasLeftIcon}
              hasRightIcon={hasRightIcon}
            >
              {children}
            </ButtonText>
          )}
          {hasRightIcon && icon}
        </>
      )}
    </ButtonContainer>
  );
};