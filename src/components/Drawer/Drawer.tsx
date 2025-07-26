// src/components/Drawer/Drawer.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Animated, Dimensions, TouchableWithoutFeedback, View } from 'react-native';

type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
}

const Overlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const DrawerContainer = styled(Animated.View)<{ position: DrawerPosition, width: number | string, height: number | string }>`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.background};
  ${({ position }) => position === 'left' && 'left: 0;'}
  ${({ position }) => position === 'right' && 'right: 0;'}
  ${({ position }) => position === 'top' && 'top: 0;'}
  ${({ position }) => position === 'bottom' && 'bottom: 0;'}
  ${({ position, width }) => (position === 'left' || position === 'right') && `width: ${width};`}
  ${({ position, height }) => (position === 'top' || position === 'bottom') && `height: ${height};`}
`;

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = 'left',
  width = '80%',
  height = '40%',
  children,
}) => {
  const [animation] = useState(new Animated.Value(0));
  const screenDimensions = Dimensions.get('window');

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const getDrawerStyle = () => {
    switch (position) {
      case 'left':
        return {
          transform: [{
            translateX: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [-screenDimensions.width, 0],
            }),
          }],
        };
      case 'right':
        return {
          transform: [{
            translateX: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [screenDimensions.width, 0],
            }),
          }],
        };
      case 'top':
        return {
          transform: [{
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [-screenDimensions.height, 0],
            }),
          }],
        };
      case 'bottom':
        return {
          transform: [{
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [screenDimensions.height, 0],
            }),
          }],
        };
    }
  };

  const overlayOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <>
      {isOpen && (
        <Overlay style={{ opacity: overlayOpacity }}>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        </Overlay>
      )}
      <DrawerContainer 
        style={getDrawerStyle()} 
        position={position}
        width={width}
        height={height}
      >
        {children}
      </DrawerContainer>
    </>
  );
};