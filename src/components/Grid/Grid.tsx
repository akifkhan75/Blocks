// src/components/Grid/Grid.tsx
import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

interface GridProps {
  columns?: number;
  spacing?: number;
  children?: React.ReactNode;
}

const GridContainer = styled(View)<{ spacing: number }>`
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -${({ spacing }) => spacing / 2}px;
  margin-right: -${({ spacing }) => spacing / 2}px;
`;

const GridItem = styled(View)<{ columns: number, spacing: number }>`
  width: ${({ columns }) => 100 / columns}%;
  padding-left: ${({ spacing }) => spacing / 2}px;
  padding-right: ${({ spacing }) => spacing / 2}px;
  margin-bottom: ${({ spacing }) => spacing}px;
`;

export const Grid: React.FC<GridProps> & { Item: React.FC } = ({
  columns = 2,
  spacing = 16,
  children,
}) => {
  return (
    <GridContainer spacing={spacing}>
      {React.Children.map(children, (child, index) => (
        <GridItem key={index} columns={columns} spacing={spacing}>
          {child}
        </GridItem>
      ))}
    </GridContainer>
  );
};

Grid.Item = ({ children }) => <>{children}</>;
