// src/components/Drawer/Drawer.stories.tsx
import React, { useState } from 'react';
import { Drawer } from './Drawer';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';
import { Button } from '../Button/Button';
import { Text } from '../Typography/Text';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const LeftDrawer = Template.bind({});
LeftDrawer.args = {
  position: 'left',
  children: <Text>Left Drawer Content</Text>,
};

export const RightDrawer = Template.bind({});
RightDrawer.args = {
  position: 'right',
  children: <Text>Right Drawer Content</Text>,
};