import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Checkbox } from '../src/components/CheckBox';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Checkbox Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Checkbox label="Test Checkbox" />
      </BlocksProvider>
    );
    expect(getByText('Test Checkbox')).toBeTruthy();
  });

  it('toggles when pressed', () => {
    const mockChange = jest.fn();
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Checkbox onChange={mockChange} testID="checkbox" />
      </BlocksProvider>
    );
    
    fireEvent.press(getByTestId('checkbox'));
    expect(mockChange).toHaveBeenCalledWith(true);
  });

  it('shows check icon when checked', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Checkbox checked testID="checkbox" />
      </BlocksProvider>
    );
    expect(getByTestId('checkbox-icon')).toBeTruthy();
  });
});