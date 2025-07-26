// src/components/Divider/Divider.stories.tsx
import React from 'react';
import { Divider } from './Divider';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';
import { Stack } from '../Stack/Stack';
import { Text } from '../Typography/Text';

export default {
  title: 'Components/Divider',
  component: Divider,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

export const Horizontal = () => (
  <Stack spacing={16}>
    <Text>Above the divider</Text>
    <Divider />
    <Text>Below the divider</Text>
  </Stack>
);

export const Vertical = () => (
  <Stack direction="horizontal" spacing={16}>
    <Text>Left</Text>
    <Divider orientation="vertical" />
    <Text>Right</Text>
  </Stack>
);

export const ThickDivider = () => (
  <Stack spacing={16}>
    <Text>Above thick divider</Text>
    <Divider thickness={4} />
    <Text>Below thick divider</Text>
  </Stack>
);
