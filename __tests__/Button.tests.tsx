import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../src/components/Button';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Button>Test Button</Button>
      </BlocksProvider>
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Button onPress={mockPress}>Press Me</Button>
      </BlocksProvider>
    );
    
    fireEvent.press(getByText('Press Me'));
    expect(mockPress).toHaveBeenCalled();
  });

  it('shows loading indicator when loading', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Button loading>Test</Button>
      </BlocksProvider>
    );
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Button disabled onPress={mockPress}>Disabled</Button>
      </BlocksProvider>
    );
    
    fireEvent.press(getByText('Disabled'));
    expect(mockPress).not.toHaveBeenCalled();
  });
});