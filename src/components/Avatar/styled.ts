import styled from 'styled-components/native';
import { Image, View } from 'react-native';
import { Text } from '../Typography/Text';

export const AvatarContainer = styled(View)<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const AvatarImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const AvatarText = styled(Text)<{ size: number }>`
  font-size: ${({ size }) => size / 2}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;