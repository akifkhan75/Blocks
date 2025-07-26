// src/components/Avatar/Avatar.stories.tsx
import React from 'react';
import { Avatar } from './Avatar';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';
import { Stack } from '../Stack/Stack';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

export const Initials = () => <Avatar initials="JD" />;

export const Sizes = () => (
  <Stack direction="horizontal" spacing={16}>
    <Avatar size="sm" initials="SM" />
    <Avatar size="md" initials="MD" />
    <Avatar size="lg" initials="LG" />
    <Avatar size="xl" initials="XL" />
  </Stack>
);

export const ImageAvatar = () => (
  <Avatar 
    source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
    size="lg"
  />
);