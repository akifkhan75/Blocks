import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styled from 'styled-components/native';
import { 
  Modal as RNModal, 
  View, 
  TouchableWithoutFeedback, 
  KeyboardAvoidingView, 
  Platform,
  PanResponder,
  Animated
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
// import { Icon } from '../Icon/Icon';
import { Text } from '../Typography';
import { Button } from '../Button';

type ModalVariant = 'basic' | 'bottom-sheet' | 'fullscreen' | 'alert' | 'confirmation' | 'form';
type ModalAnimation = 'fade' | 'slide' | 'none';

interface ModalProps {
  variant?: ModalVariant;
  animation?: ModalAnimation;
  visible?: boolean;
  onDismiss?: () => void;
  backdropBlur?: boolean;
  dismissOnBackdropPress?: boolean;
  dismissOnSwipe?: boolean;
  swipeDirection?: 'up' | 'down' | 'left' | 'right';
  keyboardAvoiding?: boolean;
  children?: React.ReactNode;
}

interface ModalHeaderProps {
  title?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

interface ModalFooterProps {
  children?: React.ReactNode;
}

const ModalContainer = styled.View`
  flex: 1;
  justify-content: ${({ variant }) => 
    variant === 'bottom-sheet' ? 'flex-end' : 'center'};
  background-color: ${({ backdropBlur, theme }) => 
    backdropBlur ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)'};
`;

const ModalContent = styled(Animated.View)<{ variant: ModalVariant }>`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ variant, theme }) => 
    variant === 'bottom-sheet' ? `${theme.borders.radius.lg}px ${theme.borders.radius.lg}px 0 0` : 
    theme.borders.radius.md}px;
  margin: ${({ variant }) => variant === 'fullscreen' ? 0 : 20};
  ${({ variant }) => variant === 'fullscreen' ? `
    flex: 1;
  ` : variant === 'bottom-sheet' ? `
    width: 100%;
    max-height: 90%;
  ` : `
    max-width: 500px;
    max-height: 90%;
  `}
`;

const ModalHeader = styled.View<{ variant: ModalVariant }>`
  padding: 16px;
  border-bottom-width: ${({ variant }) => variant === 'fullscreen' ? 0 : 1}px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ModalBody = styled.View`
  padding: 16px;
`;

const ModalFooter = styled.View`
  padding: 16px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
`;

export const Modal = forwardRef<any, ModalProps>(({
  variant = 'basic',
  animation = 'fade',
  visible = false,
  onDismiss,
  backdropBlur = false,
  dismissOnBackdropPress = true,
  dismissOnSwipe = false,
  swipeDirection = 'down',
  keyboardAvoiding = true,
  children,
}, ref) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(visible);
  const translateY = new Animated.Value(0);
  const opacity = new Animated.Value(0);

  // For swipe to dismiss
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => dismissOnSwipe,
    onPanResponderMove: (_, gestureState) => {
      if (dismissOnSwipe && swipeDirection === 'down') {
        translateY.setValue(Math.max(0, gestureState.dy));
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (dismissOnSwipe && swipeDirection === 'down' && gestureState.dy > 50) {
        handleDismiss();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleDismiss = () => {
    if (animation === 'fade') {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
        onDismiss?.();
      });
    } else if (animation === 'slide') {
      Animated.timing(translateY, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
        onDismiss?.();
      });
    } else {
      setIsVisible(false);
      onDismiss?.();
    }
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      setIsVisible(true);
      if (animation === 'fade') {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else if (animation === 'slide') {
        translateY.setValue(300);
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
    hide: handleDismiss,
  }));

  if (!isVisible) return null;

  const contentStyle = {
    transform: [{ translateY }],
    opacity,
  };

  const renderContent = () => (
    <ModalContent 
      variant={variant}
      style={animation !== 'none' ? contentStyle : {}}
      {...(variant === 'bottom-sheet' ? panResponder.panHandlers : {})}
    >
      {children}
    </ModalContent>
  );

  return (
    <RNModal
      transparent
      animationType="none"
      visible={isVisible}
      onRequestClose={handleDismiss}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        enabled={keyboardAvoiding}
      >
        <ModalContainer 
          variant={variant}
          backdropBlur={backdropBlur}
        >
          <TouchableWithoutFeedback onPress={dismissOnBackdropPress ? handleDismiss : undefined}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
          {renderContent()}
        </ModalContainer>
      </KeyboardAvoidingView>
    </RNModal>
  );
});

export const ModalHeaderComponent: React.FC<ModalHeaderProps> = ({
  title,
  showCloseButton = true,
  onClose,
  children,
}) => {
  return (
    <ModalHeader>
      {title && <Text variant="h5">{title}</Text>}
      {children}
      {/* {showCloseButton && (
        <Icon 
          name="close" 
          onPress={onClose} 
          size={24} 
          color={theme.colors.text} 
        />
      )} */}
    </ModalHeader>
  );
};

export const ModalFooterComponent: React.FC<ModalFooterProps> = ({ children }) => {
  return (
    <ModalFooter>
      {children}
    </ModalFooter>
  );
};

// Convenience components for specific modal types
export const AlertDialog: React.FC<ModalProps & { 
  title: string;
  message: string;
  buttons: React.ReactNode[];
}> = ({ title, message, buttons, ...props }) => {
  return (
    <Modal variant="basic" {...props}>
      <ModalHeaderComponent title={title} />
      <ModalBody>
        <Text>{message}</Text>
      </ModalBody>
      <ModalFooterComponent>
        {buttons}
      </ModalFooterComponent>
    </Modal>
  );
};

export const ConfirmationDialog: React.FC<ModalProps & { 
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}> = ({ 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  ...props 
}) => {
  return (
    <Modal variant="basic" {...props}>
      <ModalHeaderComponent title={title} />
      <ModalBody>
        <Text>{message}</Text>
      </ModalBody>
      <ModalFooterComponent>
        <Button variant="outline" onPress={onCancel}>
          {cancelText}
        </Button>
        <Button onPress={onConfirm}>
          {confirmText}
        </Button>
      </ModalFooterComponent>
    </Modal>
  );
};

export const BottomSheet: React.FC<ModalProps> = (props) => {
  return <Modal variant="bottom-sheet" animation="slide" dismissOnSwipe {...props} />;
};

export const FullScreenModal: React.FC<ModalProps> = (props) => {
  return <Modal variant="fullscreen" animation="slide" {...props} />;
};