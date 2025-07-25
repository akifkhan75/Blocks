import React from 'react';
import { render } from '@testing-library/react-native';
import { List, ListItem, SwipeableListItem, ExpandableListItem, SectionedList } from '../src/components/List/List';
import { Text } from '../src/components/Typography';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('List Components', () => {
  const testData = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
  ];

  it('renders basic list correctly', () => {
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <List
          data={testData}
          renderItem={({ item }) => <ListItem><Text>{item.title}</Text></ListItem>}
        />
      </BlocksProvider>
    );
    expect(getByText('Item 1')).toBeTruthy();
    expect(getByText('Item 2')).toBeTruthy();
  });

  it('renders grid list with correct columns', () => {
    const { getAllByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <List
          variant="grid"
          numColumns={2}
          data={testData}
          renderItem={({ item }) => (
            <ListItem testID="grid-item">
              <Text>{item.title}</Text>
            </ListItem>
          )}
        />
      </BlocksProvider>
    );
    const items = getAllByTestId('grid-item');
    expect(items.length).toBe(2);
  });

  it('renders swipeable list item with actions', () => {
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <SwipeableListItem
          leftActions={[<Text key="1">Left Action</Text>]}
          rightActions={[<Text key="1">Right Action</Text>]}
        >
          <Text>Content</Text>
        </SwipeableListItem>
      </BlocksProvider>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('expands and collapses expandable list item', () => {
    const { getByText, queryByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <ExpandableListItem
          header={<Text>Header</Text>}
          content={<Text>Content</Text>}
          isExpanded={false}
        />
      </BlocksProvider>
    );
    expect(queryByText('Content')).toBeNull();
  });

  it('renders section headers in sectioned list', () => {
    const sections = [
      { title: 'Section 1', data: [{ id: '1', title: 'Item 1' }] },
    ];
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <SectionedList
          sections={sections}
          renderItem={({ item }) => <Text>{item.title}</Text>}
          renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
        />
      </BlocksProvider>
    );
    expect(getByText('Section 1')).toBeTruthy();
    expect(getByText('Item 1')).toBeTruthy();
  });
});