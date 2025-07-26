// src/components/Select/Select.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Select } from '../src/components/Select';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Select Component', () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ];

  it('renders placeholder when no value selected', () => {
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Select options={options} placeholder="Test Placeholder" />
      </BlocksProvider>
    );
    expect(getByText('Test Placeholder')).toBeTruthy();
  });

  it('shows selected option label', () => {
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Select options={options} value="2" />
      </BlocksProvider>
    );
    expect(getByText('Option 2')).toBeTruthy();
  });
});