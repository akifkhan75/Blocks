// src/components/Radio/Radio.stories.tsx
import React, { useState } from 'react';
import { Radio } from './Radio';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';
import { Stack } from '../Stack/Stack';
import { Text } from '../Typography/Text';

export default {
  title: 'Components/Radio',
  component: Radio,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

const Template = (args) => {
  const [selected, setSelected] = useState(false);
  return <Radio {...args} selected={selected} onChange={setSelected} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Selected = Template.bind({});
Selected.args = {
  selected: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Custom = Template.bind({});
Custom.args = {
  size: 32,
  color: 'purple',
};

export const Group = () => {
  const [selectedValue, setSelectedValue] = useState('option2');

  return (
    <Stack spacing={16}>
      <Stack direction="horizontal" spacing={16} align="center">
        <Radio 
          selected={selectedValue === 'option1'} 
          onChange={() => setSelectedValue('option1')} 
        />
        <Text>Option 1</Text>
      </Stack>
      <Stack direction="horizontal" spacing={16} align="center">
        <Radio 
          selected={selectedValue === 'option2'} 
          onChange={() => setSelectedValue('option2')} 
        />
        <Text>Option 2</Text>
      </Stack>
      <Stack direction="horizontal" spacing={16} align="center">
        <Radio 
          selected={selectedValue === 'option3'} 
          onChange={() => setSelectedValue('option3')}
          disabled
        />
        <Text>Option 3 (disabled)</Text>
      </Stack>
    </Stack>
  );
};