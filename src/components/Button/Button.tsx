import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useHaptic } from '../../hooks/useHaptic';
import { useTheme } from 'styled-components';
import { ButtonProps } from './types';
import { ButtonContainer, ButtonText } from './styled';

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
  const theme = useTheme();

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
          color={
            variant === 'solid' || variant === 'fab' 
              ? theme.colors.text 
              : theme.colors.primary
          }
        />
      ) : (
        <>
          {hasLeftIcon && icon}
          {children && (
            <ButtonText variant={variant} iconPosition={iconPosition}>
              {children}
            </ButtonText>
          )}
          {hasRightIcon && icon}
        </>
      )}
    </ButtonContainer>
  );
};