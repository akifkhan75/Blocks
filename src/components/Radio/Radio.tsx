// src/components/Radio/Radio.tsx
import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from '../Icon/Icon';

interface RadioProps {
  selected?: boolean;
  onChange?: (selected: boolean) => void;
  disabled?: boolean;
  size?: number;
  color?: string;
}

const RadioContainer = styled(TouchableOpacity)<{ disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const RadioOuter = styled(View)<{ selected: boolean, size: number, color?: string }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-width: 2px;
  border-color: ${({ selected, color, theme }) => 
    selected ? (color || theme.colors.primary) : theme.colors.border};
  border-radius: ${({ size }) => size / 2}px;
  justify-content: center;
  align-items: center;
`;

const RadioInner = styled(View)<{ selected: boolean, size: number, color?: string }>`
  width: ${({ size }) => size * 0.5}px;
  height: ${({ size }) => size * 0.5}px;
  border-radius: ${({ size }) => size * 0.25}px;
  background-color: ${({ selected, color, theme }) => 
    selected ? (color || theme.colors.primary) : 'transparent'};
`;

export const Radio: React.FC<RadioProps> = ({
  selected = false,
  onChange,
  disabled = false,
  size = 24,
  color,
}) => {
  const handlePress = () => {
    if (!disabled && onChange) {
      onChange(!selected);
    }
  };

  return (
    <RadioContainer 
      onPress={handlePress} 
      disabled={disabled}
      activeOpacity={0.7}
    >
      <RadioOuter selected={selected} size={size} color={color}>
        <RadioInner selected={selected} size={size} color={color} />
      </RadioOuter>
    </RadioContainer>
  );
};