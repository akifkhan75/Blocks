// src/components/Slider/Slider.stories.tsx
import React, { useState } from 'react';
import { Slider } from './Slider';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';
import { Text } from '../Typography/Text';
import { Stack } from '../Stack/Stack';

export default {
  title: 'Components/Slider',
  component: Slider,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

const Template = (args) => {
  const [value, setValue] = useState(50);
  return (
    <Stack spacing={16}>
      <Text>Value: {value}</Text>
      <Slider {...args} value={value} onChange={setValue} />
    </Stack>
  );
};

export const Default = Template.bind({});
Default.args = {
  min: 0,
  max: 100,
  step: 1,
};

export const CustomRange = Template.bind({});
CustomRange.args = {
  min: 20,
  max: 80,
  step: 5,
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  thumbColor: 'red',
  trackColor: 'blue',
};
