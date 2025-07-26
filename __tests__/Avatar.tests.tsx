// src/components/Avatar/Avatar.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Avatar } from '../src/components/Avatar';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Avatar Component', () => {
  it('renders initials when no image provided', () => {
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Avatar initials="AB" />
      </BlocksProvider>
    );
    expect(getByText('AB')).toBeTruthy();
  });

  it('uses correct size mapping', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Avatar testID="avatar" size="lg" initials="AB" />
      </BlocksProvider>
    );
    const avatar = getByTestId('avatar');
    expect(avatar.props.style.width).toBe(64);
    expect(avatar.props.style.height).toBe(64);
  });
});