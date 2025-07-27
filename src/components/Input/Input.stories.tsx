import React from 'react';
import { Input } from './Input';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';
import { Icon } from '../Icon/Icon';

export default {
  title: 'Components/Input',
  component: Input,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

const Template = (args) => <Input {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  placeholder: 'Basic Input',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Email Address',
  placeholder: 'Enter your email',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  label: 'Search',
  placeholder: 'Search...',
  leftIcon: <Icon name="search" />,
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  label: 'Password',
  placeholder: 'Enter your password',
  error: 'Password must be at least 8 characters',
};

export const SuccessState = Template.bind({});
SuccessState.args = {
  label: 'Email',
  placeholder: 'Enter your email',
  success: 'Email is valid',
};