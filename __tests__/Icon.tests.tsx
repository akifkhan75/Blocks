// src/components/Icon/Icon.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Icon } from '../src/components/Icon';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Icon Component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Icon testID="icon" name="home" />
      </BlocksProvider>
    );
    const icon = getByTestId('icon');
    expect(icon.props.name).toBe('home');
    expect(icon.props.size).toBe(24);
  });

  it('uses correct size mapping', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Icon testID="icon" name="home" size="lg" />
      </BlocksProvider>
    );
    expect(getByTestId('icon').props.size).toBe(32);
  });
});