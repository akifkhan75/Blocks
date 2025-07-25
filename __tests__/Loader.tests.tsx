import React from 'react';
import { render } from '@testing-library/react-native';
import { Loader } from '../src/components/Loader';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Loader Component', () => {
  it('renders spinner correctly', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Loader variant="spinner" testID="loader" />
      </BlocksProvider>
    );
    expect(getByTestId('loader')).toBeTruthy();
  });

  it('uses primary color by default', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Loader variant="spinner" testID="loader" />
      </BlocksProvider>
    );
    expect(getByTestId('loader').props.color).toBe(DefaultTheme.colors.primary);
  });
});