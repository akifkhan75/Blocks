import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../src/components/Input';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Input Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Input placeholder="Test Input" />
      </BlocksProvider>
    );
    expect(getByPlaceholderText('Test Input')).toBeTruthy();
  });

  it('shows label when provided', () => {
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Input label="Test Label" />
      </BlocksProvider>
    );
    expect(getByText('Test Label')).toBeTruthy();
  });

  it('shows error message when error is string', () => {
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Input error="Test Error" />
      </BlocksProvider>
    );
    expect(getByText('Test Error')).toBeTruthy();
  });

  it('calls onFocus when focused', () => {
    const mockFocus = jest.fn();
    const { getByPlaceholderText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Input placeholder="Test" onFocus={mockFocus} />
      </BlocksProvider>
    );
    
    fireEvent(getByPlaceholderText('Test'), 'focus');
    expect(mockFocus).toHaveBeenCalled();
  });
});