import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Modal } from '../src/components/Modal';
import { Text } from '../src/components/Typography/Text';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Modal Component', () => {
  it('renders when visible is true', () => {
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Modal visible>
          <Text>Modal Content</Text>
        </Modal>
      </BlocksProvider>
    );
    expect(getByText('Modal Content')).toBeTruthy();
  });

  it('does not render when visible is false', () => {
    const { queryByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Modal visible={false}>
          <Text>Modal Content</Text>
        </Modal>
      </BlocksProvider>
    );
    expect(queryByText('Modal Content')).toBeNull();
  });

  it('calls onDismiss when backdrop is pressed', () => {
    const mockDismiss = jest.fn();
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Modal 
          visible 
          onDismiss={mockDismiss}
          testID="modal"
        >
          <Text>Modal Content</Text>
        </Modal>
      </BlocksProvider>
    );
    
    fireEvent.press(getByTestId('modal-backdrop'));
    expect(mockDismiss).toHaveBeenCalled();
  });

  it('does not dismiss when dismissOnBackdropPress is false', () => {
    const mockDismiss = jest.fn();
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Modal 
          visible 
          onDismiss={mockDismiss}
          dismissOnBackdropPress={false}
          testID="modal"
        >
          <Text>Modal Content</Text>
        </Modal>
      </BlocksProvider>
    );
    
    fireEvent.press(getByTestId('modal-backdrop'));
    expect(mockDismiss).not.toHaveBeenCalled();
  });

  it('renders header with title', () => {
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Modal visible>
          <Modal.Header title="Test Title" />
        </Modal>
      </BlocksProvider>
    );
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('renders footer with buttons', () => {
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Modal visible>
          <Modal.Footer>
            <Text>Button 1</Text>
            <Text>Button 2</Text>
          </Modal.Footer>
        </Modal>
      </BlocksProvider>
    );
    expect(getByText('Button 1')).toBeTruthy();
    expect(getByText('Button 2')).toBeTruthy();
  });
});