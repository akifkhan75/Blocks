// src/components/Icon/Icon.stories.tsx
import React from 'react';
import { Icon } from './Icon';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';
import { Stack } from '../Stack/Stack';

export default {
  title: 'Components/Icon',
  component: Icon,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

export const Default = () => <Icon name="home" />;

export const Sizes = () => (
  <Stack direction="horizontal" spacing={16}>
    <Icon name="star" size="xs" />
    <Icon name="star" size="sm" />
    <Icon name="star" size="md" />
    <Icon name="star" size="lg" />
    <Icon name="star" size="xl" />
  </Stack>
);

export const Colors = () => (
  <Stack direction="horizontal" spacing={16}>
    <Icon name="favorite" color="red" />
    <Icon name="favorite" color="green" />
    <Icon name="favorite" color="blue" />
  </Stack>
);