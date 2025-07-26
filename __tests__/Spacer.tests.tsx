// src/components/Spacer/Spacer.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Spacer } from '../src/components/Spacer';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Spacer Component', () => {
  it('renders vertical spacer by default', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Spacer testID="spacer" size={20} />
      </BlocksProvider>
    );
    const spacer = getByTestId('spacer');
    expect(spacer.props.style.height).toBe(20);
    expect(spacer.props.style.width).toBeUndefined();
  });

  it('renders horizontal spacer when specified', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Spacer testID="spacer" horizontal size={20} />
      </BlocksProvider>
    );
    const spacer = getByTestId('spacer');
    expect(spacer.props.style.width).toBe(20);
    expect(spacer.props.style.height).toBeUndefined();
  });
});