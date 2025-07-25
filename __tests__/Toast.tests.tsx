import React from 'react';
import { render } from '@testing-library/react-native';
import { Toast } from '../src/components/Toast';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Toast Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Toast message="Test Toast" />
      </BlocksProvider>
    );
    expect(getByText('Test Toast')).toBeTruthy();
  });

  it('applies correct style for success type', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Toast message="Success" type="success" testID="toast" />
      </BlocksProvider>
    );
    expect(getByTestId('toast').props.style.backgroundColor).toBe(DefaultTheme.colors.success);
  });
});