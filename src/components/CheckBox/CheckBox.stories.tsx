import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from './CheckBox';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

const Template = (args) => <Checkbox {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  label: 'Checkbox Label',
};

export const Checked = Template.bind({});
Checked.args = {
  label: 'Checked',
  checked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  disabled: true,
};

export const GroupExample = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  return (
    <CheckboxGroup
      options={options}
      selectedValues={selected}
      onChange={setSelected}
      direction="horizontal"
    />
  );
};