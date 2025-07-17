import React from 'react';
import styled from 'styled-components';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface TextProps extends RNTextProps {
  variant?: 'body' | 'caption' | 'overline';
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: 'left' | 'center' | 'right';
}

const StyledText = styled(RNText)<TextProps>`
  color: ${({ theme, color }) => color || theme.colors.text};
  font-size: ${({ theme, variant }) => 
    variant === 'caption' ? theme.typography.fontSize.sm : 
    variant === 'overline' ? theme.typography.fontSize.xs : 
    theme.typography.fontSize.md};
  font-weight: ${({ bold, theme }) => bold ? theme.typography.fontWeight.bold : theme.typography.fontWeight.regular};
  font-style: ${({ italic }) => italic ? 'italic' : 'normal'};
  text-decoration-line: ${({ underline }) => underline ? 'underline' : 'none'};
  text-align: ${({ align }) => align || 'left'};
  line-height: ${({ theme, variant }) => 
    variant === 'caption' ? theme.typography.fontSize.sm * 1.5 : 
    variant === 'overline' ? theme.typography.fontSize.xs * 1.5 : 
    theme.typography.fontSize.md * 1.5};
`;

export const Text = ({
  variant = 'body',
  children,
  ...props
}: TextProps) => {
  return (
    <StyledText variant={variant} {...props}>
      {children}
    </StyledText>
  );
};