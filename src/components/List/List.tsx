import React from 'react';
import styled from 'styled-components/native';
import { FlatList, SectionList, View, TouchableOpacity } from 'react-native';
import { Text } from '../Typography/Text';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Swipeable } from 'react-native-gesture-handler';

type ListVariant = 'basic' | 'swipeable' | 'expandable' | 'virtualized' | 'grid';
type ListLayout = 'vertical' | 'horizontal' | 'grid';

interface ListProps {
  variant?: ListVariant;
  layout?: ListLayout;
  data: any[];
  renderItem: (item: any) => React.ReactNode;
  keyExtractor?: (item: any) => string;
  numColumns?: number;
  stickyHeaders?: boolean;
  style?: any;
  onReorder?: any;
}

interface ListItemProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
}

interface SwipeableListItemProps extends ListItemProps {
  leftActions?: React.ReactNode[];
  rightActions?: React.ReactNode[];
  onSwipeableOpen?: (direction: 'left' | 'right') => void;
}

interface ExpandableListItemProps extends ListItemProps {
  isExpanded?: boolean;
  header: React.ReactNode;
  content: React.ReactNode;
}

// Base List Container
const ListContainer = styled(View)`
  width: 100%;
`;

// Base List Item
const ListItemContainer = styled(TouchableOpacity)`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const ListItem: React.FC<ListItemProps> = ({ children, onPress, style }) => {
  return (
    <ListItemContainer onPress={onPress} style={style}>
      {children}
    </ListItemContainer>
  );
};

// Swipeable List Item
const SwipeableContainer = styled(View)`
  flex-direction: row;
  width: 100%;
`;

const SwipeableContent = styled(View)`
  width: 100%;
`;

export const SwipeableListItem: React.FC<SwipeableListItemProps> = ({
  children,
  leftActions = [],
  rightActions = [],
  onSwipeableOpen,
  onPress,
}) => {
  // In a real implementation, you would use a library like react-native-gesture-handler
  // for swipeable functionality. This is a simplified version.
  
  return (
    <SwipeableContainer>
      {leftActions.length > 0 && (
        <View style={{ flexDirection: 'row' }}>
          {leftActions.map((action, index) => (
            <View key={`left-action-${index}`}>{action}</View>
          ))}
        </View>
      )}
      <SwipeableContent>
        <ListItem onPress={onPress}>{children}</ListItem>
      </SwipeableContent>
      {rightActions.length > 0 && (
        <View style={{ flexDirection: 'row' }}>
          {rightActions.map((action, index) => (
            <View key={`right-action-${index}`}>{action}</View>
          ))}
        </View>
      )}
    </SwipeableContainer>
  );
};

// Expandable List Item
const ExpandableHeader = styled(TouchableOpacity)`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

const ExpandableContent = styled(View)<{ isExpanded: boolean }>`
  padding: ${({ isExpanded }) => isExpanded ? '16px' : '0'};
  height: ${({ isExpanded }) => isExpanded ? 'auto' : '0'};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const ExpandableListItem: React.FC<ExpandableListItemProps> = ({
  header,
  content,
  isExpanded = false,
}) => {
  const [expanded, setExpanded] = React.useState(isExpanded);

  return (
    <View>
      <ExpandableHeader onPress={() => setExpanded(!expanded)}>
        {header}
      </ExpandableHeader>
      <ExpandableContent isExpanded={expanded}>
        {content}
      </ExpandableContent>
    </View>
  );
};

// Main List Component
export const List: React.FC<ListProps> = ({
  variant = 'basic',
  layout = 'vertical',
  data,
  renderItem,
  keyExtractor = (item, index) => index.toString(),
  numColumns = 1,
  stickyHeaders = false,
  style,
}) => {
  if (variant === 'grid') {
    return (
      <ListContainer style={style}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={numColumns}
          key={numColumns} // Force re-render when numColumns changes
        />
      </ListContainer>
    );
  }

  if (variant === 'virtualized') {
    return (
      <ListContainer style={style}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={5}
          updateCellsBatchingPeriod={50}
        />
      </ListContainer>
    );
  }

  return (
    <ListContainer style={style}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        stickyHeaderIndices={stickyHeaders ? [0] : []}
      />
    </ListContainer>
  );
};

// Section List Component
interface SectionListProps {
  sections: Array<{
    title: string;
    data: any[];
  }>;
  renderItem: (item: any) => React.ReactNode;
  renderSectionHeader?: (section: any) => React.ReactNode;
  stickySectionHeadersEnabled?: boolean;
}

export const SectionedList: React.FC<SectionListProps> = ({
  sections,
  renderItem,
  renderSectionHeader,
  stickySectionHeadersEnabled = true,
}) => {
  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={stickySectionHeadersEnabled}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};



export const ReorderableList: React.FC<ListProps> = ({
  data,
  renderItem,
  onReorder,
}) => {
  return (
    <DraggableFlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      onDragEnd={({ data: newData }) => onReorder(newData)}
    />
  );
};

export const SwipeableListItemEnhanced: React.FC<SwipeableListItemProps> = ({
  children,
  leftActions = [],
  rightActions = [],
  onSwipeableOpen,
}) => {
  const renderLeftActions = () => (
    <View style={{ flexDirection: 'row' }}>
      {leftActions.map((action, index) => (
        <View key={`left-action-${index}`}>{action}</View>
      ))}
    </View>
  );

  const renderRightActions = () => (
    <View style={{ flexDirection: 'row' }}>
      {rightActions.map((action, index) => (
        <View key={`right-action-${index}`}>{action}</View>
      ))}
    </View>
  );

  return (
    <Swipeable
      renderLeftActions={leftActions.length > 0 ? renderLeftActions : undefined}
      renderRightActions={rightActions.length > 0 ? renderRightActions : undefined}
      onSwipeableOpen={onSwipeableOpen}
    >
      <ListItem>{children}</ListItem>
    </Swipeable>
  );
};