// src/components/Switch/Switch.tsx
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { Animated, TouchableOpacity, View } from 'react-native';

interface SwitchProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  width?: number;
  height?: number;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
}

const SwitchContainer = styled(TouchableOpacity)<{ disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const SwitchTrack = styled(Animated.View)<{ 
  width: number, 
  height: number,
  activeColor?: string,
  inactiveColor?: string 
}>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: ${({ height }) => height / 2}px;
  background-color: ${({ theme }) => theme.colors.border};
  justify-content: center;
`;

const SwitchThumb = styled(Animated.View)<{ 
  size: number,
  thumbColor?: string 
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background-color: ${({ thumbColor, theme }) => thumbColor || theme.colors.background};
  position: absolute;
`;

export const Switch: React.FC<SwitchProps> = ({
  value = false,
  onChange,
  disabled = false,
  width = 48,
  height = 24,
  activeColor,
  inactiveColor,
  thumbColor,
}) => {
  const thumbSize = height - 4;
  const thumbPosition = useRef(new Animated.Value(value ? width - thumbSize - 2 : 2)).current;
  const trackColor = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(thumbPosition, {
        toValue: value ? width - thumbSize - 2 : 2,
        useNativeDriver: false,
      }),
      Animated.timing(trackColor, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value, width, height]);

  const handlePress = () => {
    if (!disabled && onChange) {
      onChange(!value);
    }
  };

  const backgroundColor = trackColor.interpolate({
    inputRange: [0, 1],
    outputRange: [
      inactiveColor || '#e0e0e0',
      activeColor || '#34C759', // Default iOS green
    ],
  });

  return (
    <SwitchContainer 
      onPress={handlePress} 
      disabled={disabled}
      activeOpacity={0.7}
    >
      <SwitchTrack 
        width={width} 
        height={height}
        style={{ backgroundColor }}
      >
        <SwitchThumb 
          size={thumbSize}
          thumbColor={thumbColor}
          style={{ left: thumbPosition }}
        />
      </SwitchTrack>
    </SwitchContainer>
  );
};