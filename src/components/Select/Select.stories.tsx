// src/components/Select/Select.stories.tsx
import React, { useState } from 'react';
import { Select } from './Select';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';

export default {
  title: 'Components/Select',
  component: Select,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
];

const Template = (args) => {
  const [value, setValue] = useState();
  return <Select {...args} value={value} onChange={setValue} />;
};

export const Basic = Template.bind({});
Basic.args = {
  options,
  placeholder: 'Select an option',
};

export const WithSelectedValue = Template.bind({});
WithSelectedValue.args = {
  options,
  value: '2',
};