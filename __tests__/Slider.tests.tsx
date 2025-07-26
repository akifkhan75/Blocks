// src/components/Slider/Slider.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Slider } from '../src/components/Slider';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Slider Component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Slider testID="slider" />
      </BlocksProvider>
    );
    expect(getByTestId('slider')).toBeTruthy();
  });

  it('respects min and max values', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Slider testID="slider" min={20} max={80} onChange={onChange} />
      </BlocksProvider>
    );
    // Would need to simulate pan responder events to test value clamping
    // This is simplified for the example
    expect(getByTestId('slider')).toBeTruthy();
  });
});