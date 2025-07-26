// src/components/Header/Header.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Header } from '../src/components/Header';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';
import { View } from 'react-native';

describe('Header Component', () => {
    it('renders correctly with title', () => {
      const { getByText } = render(
        <BlocksProvider theme={DefaultTheme}>
          <Header title="Test Header" />
        </BlocksProvider>
      );
      expect(getByText('Test Header')).toBeTruthy();
    });
  
    it('renders left and right content', () => {
      const { getByTestId } = render(
        <BlocksProvider theme={DefaultTheme}>
          <Header 
            leftContent={<View testID="left-content" />} 
            rightContent={<View testID="right-content" />} 
          />
        </BlocksProvider>
      );
      expect(getByTestId('left-content')).toBeTruthy();
      expect(getByTestId('right-content')).toBeTruthy();
    });
  });