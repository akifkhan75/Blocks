// src/components/Stack/Stack.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Stack } from '../src/components/Stack';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';
import { View } from 'react-native';

describe('Stack Component', () => {
  it('renders with vertical direction by default', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Stack testID="stack">
          <View />
        </Stack>
      </BlocksProvider>
    );
    expect(getByTestId('stack').props.style.flexDirection).toBe('column');
  });

  it('applies correct spacing', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Stack testID="stack" spacing={20}>
          <View />
        </Stack>
      </BlocksProvider>
    );
    expect(getByTestId('stack').props.style.gap).toBe(20);
  });
});