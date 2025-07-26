// src/components/Drawer/Drawer.test.tsx
import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Drawer } from '../src/components/Drawer';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';
import { View } from 'react-native';

describe('Drawer Component', () => {
  it('calls onClose when overlay is pressed', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Drawer isOpen onClose={onClose}>
          <View testID="drawer-content" />
        </Drawer>
      </BlocksProvider>
    );
    
    fireEvent.press(getByTestId('drawer-overlay'));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders children when open', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Drawer isOpen onClose={() => {}}>
          <View testID="drawer-content" />
        </Drawer>
      </BlocksProvider>
    );
    expect(getByTestId('drawer-content')).toBeTruthy();
  });
});