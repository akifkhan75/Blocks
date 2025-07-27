import React from 'react';
import { Tabs } from './Tabs';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';
import { Icon } from '../Icon/Icon';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

const Template = (args) => <Tabs {...args} />;

export const TopTabs = Template.bind({});
TopTabs.args = {
  items: [
    { label: 'Home', icon: <Icon name="home" /> },
    { label: 'Search', icon: <Icon name="search" /> },
    { label: 'Profile', icon: <Icon name="user" /> },
  ],
  variant: 'top',
};

export const BottomTabs = Template.bind({});
BottomTabs.args = {
  items: [
    { label: 'Home', icon: <Icon name="home" />, badge: 3 },
    { label: 'Search', icon: <Icon name="search" /> },
    { label: 'Profile', icon: <Icon name="user" /> },
  ],
  variant: 'bottom',
};