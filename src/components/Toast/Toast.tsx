import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Animated, Easing, View } from 'react-native';
import { Text } from '../Typography/Text';
import { Icon } from '../Icon/Icon';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onDismiss?: () => void;
  position?: 'top' | 'bottom';
  showIcon?: boolean;
}

const ToastContainer = styled(Animated.View)<{ type: ToastType; position: 'top' | 'bottom' }>`
  position: absolute;
  ${({ position }) => position === 'top' ? 'top: 50px' : 'bottom: 50px'};
  left: 20px;
  right: 20px;
  background-color: ${({ type, theme }) => 
    type === 'success' ? theme.colors.success :
    type === 'error' ? theme.colors.error :
    type === 'warning' ? theme.colors.warning :
    theme.colors.info};
  padding: 12px 16px;
  border-radius: ${theme.borders.radius.md}px;
  flex-direction: row;
  align-items: center;
  z-index: 1000;
  elevation: 4;
`;

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onDismiss,
  position = 'top',
  showIcon = true,
}) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onDismiss) onDismiss();
    });
  }, []);

  const getIconName = () => {
    switch (type) {
      case 'success': return 'check-circle';
      case 'error': return 'alert-circle';
      case 'warning': return 'alert';
      default: return 'info';
    }
  };

  return (
    <ToastContainer 
      type={type} 
      position={position}
      style={{ opacity }}
    >
      {showIcon && (
        <Icon 
          name={getIconName()} 
          color="white" 
          size={20} 
          style={{ marginRight: 8 }} 
        />
      )}
      <Text color="white">{message}</Text>
    </ToastContainer>
  );
};

// Toast manager to handle multiple toasts
export const ToastManager = {
  toast: null as React.RefObject<any> | null,
  
  init(toastRef: React.RefObject<any>) {
    this.toast = toastRef;
  },
  
  show(config: Omit<ToastProps, 'onDismiss'>) {
    if (this.toast?.current) {
      this.toast.current.show(config);
    }
  },
};