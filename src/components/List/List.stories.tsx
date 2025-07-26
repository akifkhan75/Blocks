import React, { useState } from 'react';
import { List, ListItem, SwipeableListItem, ExpandableListItem, SectionedList } from './List';
import { Text } from '../Typography/Text';
import { Button } from '../Button/Button';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';
import { Heading } from '../Typography';
import { View } from 'react-native';

export default {
  title: 'Components/List',
  component: List,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

const sampleData = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  title: `Item ${i + 1}`,
  description: `This is item number ${i + 1}`,
}));

const sampleSections = [
  {
    title: 'Section 1',
    data: Array.from({ length: 3 }, (_, i) => ({
      id: `1-${i}`,
      title: `Item 1-${i + 1}`,
    })),
  },
  {
    title: 'Section 2',
    data: Array.from({ length: 4 }, (_, i) => ({
      id: `2-${i}`,
      title: `Item 2-${i + 1}`,
    })),
  },
];

export const BasicList = () => (
  <List
    data={sampleData}
    renderItem={({ item }) => (
      <ListItem>
        <Heading level="h5">{item.title}</Heading>
        <Text>{item.description}</Text>
      </ListItem>
    )}
  />
);

export const SwipeableList = () => (
  <List
    variant="basic"
    data={sampleData}
    renderItem={({ item }) => (
      <SwipeableListItem
        leftActions={[
          <Button variant="ghost" size="sm" onPress={() => console.log('Archive')}>
            Archive
          </Button>
        ]}
        rightActions={[
          <Button variant="ghost" size="sm" onPress={() => console.log('Delete')}>
            Delete
          </Button>
        ]}
      >
        <Heading level="h5">{item.title}</Heading>
        <Text>{item.description}</Text>
      </SwipeableListItem>
    )}
  />
);

export const ExpandableList = () => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <List
      variant="basic"
      data={sampleData}
      renderItem={({ item }) => (
        <ExpandableListItem
          header={
            <Heading level="h5">{item.title}</Heading>
          }
          content={
            <Text>{item.description}</Text>
          }
          isExpanded={expandedItems[item.id]}
          onPress={() => toggleItem(item.id)}
        />
      )}
    />
  );
};

export const VirtualizedList = () => (
  <List
    variant="virtualized"
    data={Array.from({ length: 1000 }, (_, i) => ({
      id: i.toString(),
      title: `Item ${i + 1}`,
    }))}
    renderItem={({ item }) => (
      <ListItem>
        <Heading level="h5">{item.title}</Heading>
      </ListItem>
    )}
  />
);

export const GridList = () => (
  <List
    variant="grid"
    numColumns={2}
    data={sampleData}
    renderItem={({ item }) => (
      <ListItem style={{ flex: 1, margin: 4 }}>
        <Heading level="h5">{item.title}</Heading>
        <Text>{item.description}</Text>
      </ListItem>
    )}
  />
);

export const SectionListExample = () => (
  <SectionedList
    sections={sampleSections}
    renderItem={({ item }) => (
      <ListItem>
        <Heading level="h5">{item.title}</Heading>
      </ListItem>
    )}
    renderSectionHeader={({ section }) => (
      <View style={{ padding: 8, backgroundColor: DefaultTheme.colors.backgroundSecondary }}>
        <Heading level="h6">{section.title}</Heading>
      </View>
    )}
  />
);