// src/components/Header/Header.stories.tsx
import React from 'react';
import { Header } from './Header';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Default Header',
};

export const WithActions = Template.bind({});
WithActions.args = {
  title: 'With Actions',
  leftContent: <Button variant="ghost" icon={<Icon name="arrow-left" />} />,
  rightContent: <Button variant="ghost" icon={<Icon name="more-vertical" />} />,
};

export const Transparent = Template.bind({});
Transparent.args = {
  title: 'Transparent',
  variant: 'transparent',
};

