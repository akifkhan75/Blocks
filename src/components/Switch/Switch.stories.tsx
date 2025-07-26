// src/components/Switch/Switch.stories.tsx
import React, { useState } from 'react';
import { Switch } from './Switch';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';
import { Stack } from '../Stack/Stack';
import { Text } from '../Typography/Text';

export default {
  title: 'Components/Switch',
  component: Switch,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

const Template = (args) => {
  const [value, setValue] = useState(false);
  return <Switch {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {};

export const On = Template.bind({});
On.args = {
  value: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Custom = Template.bind({});
Custom.args = {
  width: 60,
  height: 30,
  activeColor: 'purple',
  thumbColor: 'white',
};

export const Group = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    airplaneMode: false,
  });

  const handleChange = (key: string) => (value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Stack spacing={16}>
      <Stack direction="horizontal" spacing={16} align="center" justify="space-between">
        <Text>Notifications</Text>
        <Switch 
          value={settings.notifications} 
          onChange={handleChange('notifications')} 
        />
      </Stack>
      <Stack direction="horizontal" spacing={16} align="center" justify="space-between">
        <Text>Dark Mode</Text>
        <Switch 
          value={settings.darkMode} 
          onChange={handleChange('darkMode')} 
        />
      </Stack>
      <Stack direction="horizontal" spacing={16} align="center" justify="space-between">
        <Text>Airplane Mode</Text>
        <Switch 
          value={settings.airplaneMode} 
          onChange={handleChange('airplaneMode')}
          disabled
        />
      </Stack>
    </Stack>
  );
};