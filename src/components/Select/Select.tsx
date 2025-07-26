// src/components/Select/Select.tsx
import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View, TextInput, Modal, FlatList } from 'react-native';
import { Text } from '../Typography/Text';
import { Icon } from '../Icon/Icon';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const SelectContainer = styled(View)`
  position: relative;
`;

const SelectInput = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borders.radius.sm}px;
`;

const SelectText = styled(Text)<{ isPlaceholder?: boolean }>`
  color: ${({ isPlaceholder, theme }) => 
    isPlaceholder ? theme.colors.textSecondary : theme.colors.text};
`;

const Dropdown = styled(Modal)`
  margin: 0;
  justify-content: flex-end;
`;

const DropdownBackdrop = styled(TouchableOpacity)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const DropdownContent = styled(View)`
  max-height: 50%;
  background-color: ${({ theme }) => theme.colors.background};
  border-top-left-radius: ${({ theme }) => theme.borders.radius.md}px;
  border-top-right-radius: ${({ theme }) => theme.borders.radius.md}px;
  padding: 16px 0;
`;

const OptionItem = styled(TouchableOpacity)`
  padding: 12px 16px;
`;

const OptionText = styled(Text)<{ isSelected: boolean }>`
  color: ${({ isSelected, theme }) => 
    isSelected ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ isSelected }) => isSelected ? '600' : '400'};
`;

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  placeholder = 'Select an option',
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const selectedOption = options.find(opt => opt.value === value);
  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (value: string) => {
    onChange?.(value);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <SelectContainer>
      <SelectInput onPress={() => setIsOpen(true)}>
        <SelectText isPlaceholder={!selectedOption}>
          {selectedOption?.label || placeholder}
        </SelectText>
        <Icon name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} />
      </SelectInput>

      <Dropdown
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <DropdownBackdrop onPress={() => setIsOpen(false)}>
          <DropdownContent>
            <View style={{ paddingHorizontal: 16 }}>
              <TextInput
                placeholder="Search..."
                value={search}
                onChangeText={setSearch}
                style={{ 
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 4,
                  marginBottom: 12,
                }}
              />
            </View>
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <OptionItem onPress={() => handleSelect(item.value)}>
                  <OptionText isSelected={item.value === value}>
                    {item.label}
                  </OptionText>
                </OptionItem>
              )}
            />
          </DropdownContent>
        </DropdownBackdrop>
      </Dropdown>
    </SelectContainer>
  );
};
