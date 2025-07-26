// src/components/Switch/Switch.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Switch } from '../src/components/Switch';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Switch Component', () => {
  it('renders off by default', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Switch testID="switch" />
      </BlocksProvider>
    );
    const thumb = getByTestId('switch-thumb');
    expect(thumb.props.style.left._value).toBe(2);
  });

  it('renders on when value is true', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Switch testID="switch" value />
      </BlocksProvider>
    );
    const thumb = getByTestId('switch-thumb');
    expect(thumb.props.style.left._value).toBeGreaterThan(20);
  });

  it('calls onChange when pressed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Switch testID="switch" onChange={onChange} />
      </BlocksProvider>
    );
    fireEvent.press(getByTestId('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});