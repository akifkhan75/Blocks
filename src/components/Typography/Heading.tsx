import React from 'react';
import styled from 'styled-components';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps extends RNTextProps {
  level?: HeadingLevel;
  color?: string;
}

const StyledHeading = styled(RNText)<HeadingProps>`
  color: ${({ theme, color }) => color || theme.colors.text};
  font-size: ${({ theme, level }) => 
    level === 'h1' ? theme.typography.fontSize['4xl'] : 
    level === 'h2' ? theme.typography.fontSize['3xl'] : 
    level === 'h3' ? theme.typography.fontSize['2xl'] : 
    level === 'h4' ? theme.typography.fontSize.xl : 
    level === 'h5' ? theme.typography.fontSize.lg : 
    theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing['2']}px;
`;

export const Heading = ({
  level = 'h1',
  children,
  ...props
}: HeadingProps) => {
  return (
    <StyledHeading level={level} {...props}>
      {children}
    </StyledHeading>
  );
};