// src/components/Divider/Divider.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Divider } from '../src/components/Divider';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Divider Component', () => {
  it('renders horizontal divider by default', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Divider testID="divider" />
      </BlocksProvider>
    );
    const divider = getByTestId('divider');
    expect(divider.props.style.width).toBe('100%');
    expect(divider.props.style.height).toBe(1);
  });

  it('renders vertical divider when specified', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Divider testID="divider" orientation="vertical" />
      </BlocksProvider>
    );
    const divider = getByTestId('divider');
    expect(divider.props.style.width).toBe(1);
    expect(divider.props.style.height).toBe('100%');
  });
});