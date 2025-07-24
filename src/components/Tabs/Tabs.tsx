import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../Typography/Text';

interface TabItem {
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;
}

interface TabsProps {
  items: TabItem[];
  initialIndex?: number;
  onChange?: (index: number) => void;
  variant?: 'top' | 'bottom';
  showIndicator?: boolean;
}

const TabsContainer = styled(View)<{ variant: 'top' | 'bottom' }>`
  flex-direction: row;
  ${({ variant }) => variant === 'bottom' ? `
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${theme.colors.background};
    border-top-width: 1px;
    border-top-color: ${theme.colors.border};
  ` : ''}
`;

const TabItem = styled(TouchableOpacity)<{ isActive: boolean; variant: 'top' | 'bottom' }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ variant }) => variant === 'bottom' ? '12px 8px' : '16px 8px'};
  opacity: ${({ isActive }) => isActive ? 1 : 0.6};
`;

const Indicator = styled(View)`
  position: absolute;
  bottom: 0;
  height: 3px;
  background-color: ${theme.colors.primary};
  border-radius: 3px;
  transition: left 0.3s ease, width 0.3s ease;
`;

export const Tabs: React.FC<TabsProps> = ({
  items,
  initialIndex = 0,
  onChange,
  variant = 'top',
  showIndicator = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const handlePress = (index: number) => {
    setActiveIndex(index);
    if (onChange) onChange(index);
  };

  return (
    <TabsContainer variant={variant}>
      {items.map((item, index) => (
        <TabItem
          key={index}
          isActive={index === activeIndex}
          variant={variant}
          onPress={() => handlePress(index)}
        >
          {item.icon}
          <Text 
            size="sm" 
            weight={index === activeIndex ? 'semibold' : 'regular'}
          >
            {item.label}
          </Text>
          {item.badge && (
            <Badge>
              <Text size="xs" color="white">{item.badge}</Text>
            </Badge>
          )}
        </TabItem>
      ))}
      {showIndicator && (
        <Indicator 
          style={{
            left: `${(100 / items.length) * activeIndex}%`,
            width: `${100 / items.length}%`,
          }}
        />
      )}
    </TabsContainer>
  );
};