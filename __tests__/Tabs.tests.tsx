import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Tabs } from '../src/components/Tabs';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Tabs Component', () => {
  const items = [
    { label: 'Tab 1' },
    { label: 'Tab 2' },
    { label: 'Tab 3' },
  ];

  it('renders correctly', () => {
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Tabs items={items} />
      </BlocksProvider>
    );
    expect(getByText('Tab 1')).toBeTruthy();
    expect(getByText('Tab 2')).toBeTruthy();
    expect(getByText('Tab 3')).toBeTruthy();
  });

  it('calls onChange when tab is pressed', () => {
    const mockChange = jest.fn();
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Tabs items={items} onChange={mockChange} />
      </BlocksProvider>
    );
    
    fireEvent.press(getByText('Tab 2'));
    expect(mockChange).toHaveBeenCalledWith(1);
  });

  it('shows indicator when showIndicator is true', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Tabs items={items} showIndicator />
      </BlocksProvider>
    );
    expect(getByTestId('tab-indicator')).toBeTruthy();
  });
});