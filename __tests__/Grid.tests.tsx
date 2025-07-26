// src/components/Grid/Grid.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Grid } from '../src/components/Grid';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Grid Component', () => {
  it('renders correct number of columns', () => {
    const { getAllByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Grid columns={3}>
          <Grid.Item><View testID="grid-item" /></Grid.Item>
          <Grid.Item><View testID="grid-item" /></Grid.Item>
          <Grid.Item><View testID="grid-item" /></Grid.Item>
        </Grid>
      </BlocksProvider>
    );
    const items = getAllByTestId('grid-item');
    expect(items.length).toBe(3);
  });

  it('applies correct spacing', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Grid spacing={20}>
          <Grid.Item><View testID="grid-item" /></Grid.Item>
        </Grid>
      </BlocksProvider>
    );
    const item = getByTestId('grid-item').parent;
    expect(item.props.style.paddingLeft).toBe(10);
  });
});