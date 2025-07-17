import React from 'react';
import styled from 'styled-components';
import { View, ViewProps } from 'react-native';
import { gridResponsiveStyles } from '../../utils/gridSystem';

interface GridProps extends ViewProps {
  container?: boolean;
  item?: boolean;
  spacing?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const GridContainer = styled(View)<{ spacing: number }>`
  flex-direction: row;
  flex-wrap: wrap;
  margin: ${({ spacing }) => -spacing / 2}px;
`;

const GridItem = styled(View)<{ spacing: number; size?: number | object }>`
  padding: ${({ spacing }) => spacing / 2}px;
  ${({ size }) => size && gridResponsiveStyles(size)}
`;

export const Grid = ({
  container = false,
  item = false,
  spacing = 0,
  xs,
  sm,
  md,
  lg,
  xl,
  children,
  ...props
}: GridProps) => {
  if (container) {
    return (
      <GridContainer spacing={spacing} {...props}>
        {children}
      </GridContainer>
    );
  }

  if (item) {
    const sizeProps = { xs, sm, md, lg, xl };
    return (
      <GridItem spacing={spacing} size={sizeProps} {...props}>
        {children}
      </GridItem>
    );
  }

  return <GridItem spacing={spacing} {...props}>{children}</GridItem>;
};