export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  size?: AvatarSize;
  source?: { uri: string };
  initials?: string;
}

export const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};