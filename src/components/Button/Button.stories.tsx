import React from 'react';
import { Button } from './Button';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { Meta, StoryFn } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story: any) => (
      <BlocksProvider>
        <Story />
      </BlocksProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  variant: 'solid',
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Outline Button',
  variant: 'outline',
};
