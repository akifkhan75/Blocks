import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
// import { Icon } from '../Icon/Icon';
import { Text } from '../Typography/Text';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CheckboxContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const CheckboxBox = styled(View)<{ checked: boolean; disabled?: boolean; size: string }>`
  width: ${({ size }) => 
    size === 'sm' ? 16 : 
    size === 'md' ? 20 : 
    24}px;
  height: ${({ size }) => 
    size === 'sm' ? 16 : 
    size === 'md' ? 20 : 
    24}px;
  border-width: 2px;
  border-color: ${({ checked, theme }) => 
    checked ? theme.colors.primary : theme.colors.border};
  background-color: ${({ checked, theme }) => 
    checked ? theme.colors.primary : 'transparent'};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

const CheckboxLabel = styled(Text)`
  margin-left: 8px;
`;

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  label,
  size = 'md',
}) => {
  const handlePress = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <CheckboxContainer onPress={handlePress} disabled={disabled}>
      <CheckboxBox checked={checked} disabled={disabled} size={size}>
        {/* {checked && <Icon name="check" size={size} color="white" />} */}
      </CheckboxBox>
      {label && <CheckboxLabel>{label}</CheckboxLabel>}
    </CheckboxContainer>
  );
};

interface CheckboxGroupProps {
  options: Array<{ label: string; value: string }>;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  direction?: 'horizontal' | 'vertical';
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
  direction = 'vertical',
}) => {
  const handleChange = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  return (
    <View style={{ 
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      flexWrap: 'wrap',
    }}>
      {options.map(option => (
        <Checkbox
          key={option.value}
          checked={selectedValues.includes(option.value)}
          onChange={() => handleChange(option.value)}
          label={option.label}
          style={{ 
            marginRight: direction === 'horizontal' ? 16 : 0,
            marginBottom: direction === 'vertical' ? 8 : 0,
          }}
        />
      ))}
    </View>
  );
};