// src/components/Slider/Slider.tsx
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View, PanResponder, Animated } from 'react-native';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  thumbColor?: string;
  trackColor?: string;
}

const SliderContainer = styled(View)`
  height: 40px;
  justify-content: center;
`;

const Track = styled(View)`
  height: 4px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
`;

const ActiveTrack = styled(Animated.View)`
  height: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 2px;
  position: absolute;
`;

const Thumb = styled(Animated.View)<{ color?: string }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${({ color, theme }) => color || theme.colors.primary};
  position: absolute;
`;

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value: propValue = min,
  onChange,
  thumbColor,
  trackColor,
}) => {
  const [value, setValue] = useState(propValue);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [thumbPosition] = useState(new Animated.Value(0));

  const currentValue = propValue !== undefined ? propValue : value;

  const updatePosition = (newValue: number) => {
    const clampedValue = Math.max(min, Math.min(max, newValue));
    const steppedValue = Math.round(clampedValue / step) * step;
    
    if (onChange) {
      onChange(steppedValue);
    } else {
      setValue(steppedValue);
    }
    
    const position = ((steppedValue - min) / (max - min)) * sliderWidth;
    thumbPosition.setValue(position);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newPosition = Math.max(0, Math.min(sliderWidth, gestureState.moveX));
      const newValue = (newPosition / sliderWidth) * (max - min) + min;
      updatePosition(newValue);
    },
    onPanResponderRelease: () => {
      // Optional: Add haptic feedback here
    },
  });

  const handleLayout = (event: any) => {
    const width = event.nativeEvent.layout.width;
    setSliderWidth(width);
    const initialPosition = ((currentValue - min) / (max - min)) * width;
    thumbPosition.setValue(initialPosition);
  };

  return (
    <SliderContainer {...panResponder.panHandlers} onLayout={handleLayout}>
      <Track>
        <ActiveTrack style={{ width: thumbPosition }} />
      </Track>
      <Thumb 
        color={thumbColor}
        style={{ 
          transform: [{ translateX: Animated.subtract(thumbPosition, 10) }] 
        }} 
      />
    </SliderContainer>
  );
};