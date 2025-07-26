// src/components/Spacer/Spacer.stories.tsx
import React from 'react';
import { Spacer } from './Spacer';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';
import { Stack } from '../Stack/Stack';
import { Button } from '../Button/Button';

export default {
  title: 'Components/Spacer',
  component: Spacer,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

export const Vertical = () => (
  <Stack>
    <Button>Button 1</Button>
    <Spacer size={32} />
    <Button>Button 2</Button>
  </Stack>
);

export const Horizontal = () => (
  <Stack direction="horizontal">
    <Button>Button 1</Button>
    <Spacer horizontal size={32} />
    <Button>Button 2</Button>
  </Stack>
);

