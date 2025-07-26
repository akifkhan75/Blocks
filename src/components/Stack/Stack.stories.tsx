// src/components/Stack/Stack.stories.tsx
import React from 'react';
import { Stack } from './Stack';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';
import { Button } from '../Button/Button';

export default {
  title: 'Components/Stack',
  component: Stack,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

const Template = (args) => (
  <Stack {...args}>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
  </Stack>
);

export const Vertical = Template.bind({});
Vertical.args = {
  direction: 'vertical',
  spacing: 16,
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  direction: 'horizontal',
  spacing: 16,
};

export const Centered = Template.bind({});
Centered.args = {
  direction: 'vertical',
  spacing: 16,
  align: 'center',
  justify: 'center',
};