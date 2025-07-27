import React, { forwardRef, useState } from 'react';
import styled from 'styled-components/native';
import { TextInput, TextInputProps, View, Text, Platform } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Icon } from '../Icon/Icon';

type InputVariant = 'filled' | 'outline' | 'underline';
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends TextInputProps {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  helperText?: string;
  error?: boolean | string;
  success?: boolean | string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  mask?: 'phone' | 'credit-card' | 'date' | RegExp;
}

const InputContainer = styled.View<{ variant?: InputVariant }>`
  margin-bottom: 16px;
`;

const InputWrapper = styled.View<{ 
  variant?: InputVariant;
  isFocused: boolean;
  hasError: boolean;
  hasSuccess: boolean;
}>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ variant, theme }) => 
    variant === 'filled' ? theme.input.filled.backgroundColor : 'transparent'};
  border-width: ${({ variant, theme }) => 
    variant === 'outline' ? theme.borders.width.thin : 0}px;
  border-bottom-width: ${({ variant }) => 
    variant === 'underline' ? 1 : 0}px;
  border-color: ${({ isFocused, hasError, hasSuccess, theme }) => 
    hasError ? theme.colors.error :
    hasSuccess ? theme.colors.success :
    isFocused ? theme.colors.primary : 
    theme.colors.border};
  border-radius: ${({ variant, theme }) => 
    variant === 'outline' ? theme.borders.radius.md : 0}px;
  padding: ${({ size }) => 
    size === 'sm' ? '8px 12px' :
    size === 'md' ? '12px 16px' :
    '16px 20px'};
`;

const StyledInput = styled.TextInput<{ hasLeftIcon: boolean; hasRightIcon: boolean }>`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.text};
  padding-left: ${({ hasLeftIcon }) => hasLeftIcon ? 8 : 0}px;
  padding-right: ${({ hasRightIcon }) => hasRightIcon ? 8 : 0}px;
`;

const Label = styled(Text)<{ isFocused: boolean; hasError: boolean; hasSuccess: boolean }>`
  margin-bottom: 4px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ isFocused, hasError, hasSuccess, theme }) => 
    hasError ? theme.colors.error :
    hasSuccess ? theme.colors.success :
    isFocused ? theme.colors.primary : 
    theme.colors.text};
`;

const HelperText = styled(Text)<{ hasError: boolean; hasSuccess: boolean }>`
  margin-top: 4px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ hasError, hasSuccess, theme }) => 
    hasError ? theme.colors.error :
    hasSuccess ? theme.colors.success :
    theme.colors.textSecondary};
`;

export const Input = forwardRef<TextInput, InputProps>(({
  variant = 'outline',
  size = 'md',
  label,
  helperText,
  error = false,
  success = false,
  leftIcon,
  rightIcon,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!error;
  const hasSuccess = !!success;
  const hasLeftIcon = !!leftIcon;
  const hasRightIcon = !!rightIcon;
  const theme = useTheme();

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <InputContainer variant={variant}>
      {label && (
        <Label 
          isFocused={isFocused}
          hasError={hasError}
          hasSuccess={hasSuccess}
        >
          {label}
        </Label>
      )}
      <InputWrapper
        variant={variant}
        isFocused={isFocused}
        hasError={hasError}
        hasSuccess={hasSuccess}
      >
        {leftIcon && (
          <View style={{ marginRight: 8 }}>
            {leftIcon}
          </View>
        )}
        <StyledInput
          ref={ref}
          hasLeftIcon={hasLeftIcon}
          hasRightIcon={hasRightIcon}
          // placeholderTextColor={theme.colors.text}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {rightIcon && (
          <View style={{ marginLeft: 8 }}>
            {rightIcon}
          </View>
        )}
      </InputWrapper>
      {(helperText || error || success) && (
        <HelperText hasError={hasError} hasSuccess={hasSuccess}>
          {typeof error === 'string' ? error : 
           typeof success === 'string' ? success : 
           helperText}
        </HelperText>
      )}
    </InputContainer>
  );
});