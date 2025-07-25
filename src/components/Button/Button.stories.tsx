import React from 'react';
import { Button } from './Button';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';
// import { Icon } from '../Icon/Icon';

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

const Template = (args) => <Button {...args} />;

export const Solid = Template.bind({});
Solid.args = {
  children: 'Solid Button',
  variant: 'solid',
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Outline Button',
  variant: 'outline',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: 'With Icon',
  icon: '',
  iconPosition: 'left',
};

export const Loading = Template.bind({});
Loading.args = {
  children: 'Loading Button',
  loading: true,
};

export const FAB = Template.bind({});
FAB.args = {
  icon: '',
  variant: 'fab',
  shape: 'circle',
  size: 'lg',
};