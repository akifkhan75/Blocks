import React from 'react';
import { Loader } from './Loader';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';

export default {
  title: 'Components/Loader',
  component: Loader,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

const Template = (args) => <Loader {...args} />;

export const Spinner = Template.bind({});
Spinner.args = {
  variant: 'spinner',
};

export const LargeSpinner = Template.bind({});
LargeSpinner.args = {
  variant: 'spinner',
  size: 'lg',
};

export const ColoredSpinner = Template.bind({});
ColoredSpinner.args = {
  variant: 'spinner',
  color: 'red',
};