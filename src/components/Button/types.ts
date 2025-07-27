export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'glass' | 'fab';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonShape = 'rectangle' | 'rounded' | 'pill' | 'circle';
export type IconPosition = 'left' | 'right';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  hapticFeedback?: 'light' | 'medium' | 'heavy';
  shape?: ButtonShape;
  children?: React.ReactNode;
  onPress?: () => void;
}