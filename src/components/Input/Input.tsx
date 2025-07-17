import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import { TextInput, TextInputProps, View, StyleSheet } from 'react-native';
import { Text } from '../Typography/Text';
import { useTheme } from '../../hooks/useTheme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  variant?: 'outline' | 'filled' | 'underlined';
}

const InputContainer = styled(View)`
  margin-bottom: ${({ theme }) => theme.spacing['3']}px;
`;

const InputLabel = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing['1']}px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const InputWrapper = styled(View)<{ isFocused: boolean; hasError: boolean; variant: string }>`
  flex-direction: row;
  align-items: center;
  border-radius: ${({ theme, variant }) => variant === 'outline' ? theme.borders.radius.sm : 0};
  background-color: ${({ theme, variant }) => variant === 'filled' ? theme.colors.cardBackground : 'transparent'};
  border-width: ${({ theme, variant }) => variant === 'outline' ? theme.borders.width.thin : 0};
  border-bottom-width: ${({ variant }) => variant === 'underlined' ? 1 : 0};
  border-color: ${({ theme, isFocused, hasError }) => 
    hasError ? theme.colors.error : 
    isFocused ? theme.colors.primary : theme.colors.muted};
  padding: ${({ theme }) => `${theme.spacing['2']}px ${theme.spacing['3']}px`};
`;

const StyledInput = styled(TextInput)`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing['1']}px 0`};
`;

const InputError = styled(Text)`
  margin-top: ${({ theme }) => theme.spacing['1']}px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
`;

export const Input = forwardRef<TextInput, InputProps>(({
  label,
  error,
  leftElement,
  rightElement,
  variant = 'outline',
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
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
    <InputContainer>
      {label && <InputLabel>{label}</InputLabel>}
      <InputWrapper 
        isFocused={isFocused} 
        hasError={!!error}
        variant={variant}
      >
        {leftElement && (
          <View style={{ marginRight: 2 }}>
            {leftElement}
          </View>
        )}
        <StyledInput
          ref={ref}
          placeholderTextColor={'grey'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {rightElement && (
          <View style={{ marginLeft: 2 }}>
            {rightElement}
          </View>
        )}
      </InputWrapper>
      {error && <InputError>{error}</InputError>}
    </InputContainer>
  );
});