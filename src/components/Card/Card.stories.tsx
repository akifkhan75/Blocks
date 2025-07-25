import React from 'react';
import { Card } from './Card';
import { Text, Heading } from '../Typography';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';
import { Image, View } from 'react-native';

// Sample image source (replace with your actual image)
// const sampleImage = require('../../../assets/sample-image.jpg');

export default {
  title: 'Components/Card',
  component: Card,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

const Template = (args) => <Card {...args} />;

export const BasicCard = Template.bind({});
BasicCard.args = {
  children: (
    <Card.Content>
      <Heading level="h3">Basic Card</Heading>
      <Text>This is a basic card with some content</Text>
    </Card.Content>
  ),
};

export const MediaCard = () => (
  <Card variant="media">
    {/* <Card.Image source={sampleImage} height={150} /> */}
    <Card.Content>
      <Heading level="h3">Media Card</Heading>
      <Text>This card has an image with content below it</Text>
    </Card.Content>
  </Card>
);

export const GlassCard = () => (
  <Card variant="glass" intensity={15}>
    {/* <Card.Image source={sampleImage} /> */}
    <Card.Content>
      <Heading level="h3" style={{ color: 'white' }}>Glass Card</Heading>
      <Text style={{ color: 'white' }}>iOS-style frosted glass effect</Text>
    </Card.Content>
  </Card>
);

export const StatsCard = () => (
  <Card variant="basic">
    <Card.Content padding={24}>
      <Heading level="h4" style={{ marginBottom: 8 }}>Monthly Stats</Heading>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Heading level="h2">1,234</Heading>
          <Text>Visits</Text>
        </View>
        <View>
          <Heading level="h2">567</Heading>
          <Text>Signups</Text>
        </View>
      </View>
    </Card.Content>
  </Card>
);

export const ProductCard = () => (
  <Card variant="basic" elevation="high">
    {/* <Card.Image source={sampleImage} height={120} /> */}
    <Card.Content>
      <Heading level="h4">Premium Product</Heading>
      <Text style={{ marginVertical: 8 }}>High-quality product description</Text>
      <Heading level="h5">$99.99</Heading>
    </Card.Content>
  </Card>
);

export const NotificationCard = () => (
  <Card variant="basic" elevation="low">
    <Card.Content>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ 
          width: 40, 
          height: 40, 
          borderRadius: 20, 
          backgroundColor: DefaultTheme.colors.primary,
          marginRight: 12,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white' }}>!</Text>
        </View>
        <View>
          <Heading level="h5">New Notification</Heading>
          <Text>You have a new message</Text>
        </View>
      </View>
    </Card.Content>
  </Card>
);