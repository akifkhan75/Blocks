// src/components/Radio/Radio.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Radio } from '../src/components/Radio';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Radio Component', () => {
  it('renders unselected by default', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Radio testID="radio" />
      </BlocksProvider>
    );
    const inner = getByTestId('radio-inner');
    expect(inner.props.style.backgroundColor).toBe('transparent');
  });

  it('renders selected when prop is true', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Radio testID="radio" selected />
      </BlocksProvider>
    );
    const inner = getByTestId('radio-inner');
    expect(inner.props.style.backgroundColor).not.toBe('transparent');
  });

  it('calls onChange when pressed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Radio testID="radio" onChange={onChange} />
      </BlocksProvider>
    );
    fireEvent.press(getByTestId('radio'));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});