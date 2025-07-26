import React, { useRef } from 'react';
import { Modal, BottomSheet, FullScreenModal, AlertDialog, ConfirmationDialog } from './Modal';
import { Button } from '../Button/Button';
import { Text } from '../Typography/Text';
import { BlocksProvider } from '../../providers/BlocksProvider';
import { DefaultTheme } from '../../themes/default';

export default {
  title: 'Components/Modal',
  component: Modal,
  decorators: [
    (Story) => (
      <BlocksProvider theme={DefaultTheme}>
        <Story />
      </BlocksProvider>
    ),
  ],
};

export const BasicModal = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>Open Modal</Button>
      <Modal visible={visible} onDismiss={() => setVisible(false)}>
        <Modal.Header title="Basic Modal">
          <Text>Additional header content</Text>
        </Modal.Header>
        <Modal.Body>
          <Text>This is the modal content</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onPress={() => setVisible(false)}>
            Cancel
          </Button>
          <Button onPress={() => setVisible(false)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const BottomSheetExample = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>Open Bottom Sheet</Button>
      <BottomSheet 
        visible={visible} 
        onDismiss={() => setVisible(false)}
        backdropBlur
      >
        <Modal.Header title="Bottom Sheet" />
        <Modal.Body>
          <Text>Swipe down or tap backdrop to dismiss</Text>
        </Modal.Body>
      </BottomSheet>
    </>
  );
};

export const FullScreenModalExample = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>Open Full Screen Modal</Button>
      <FullScreenModal 
        visible={visible} 
        onDismiss={() => setVisible(false)}
      >
        <Modal.Header 
          title="Full Screen Modal" 
          showCloseButton 
          onClose={() => setVisible(false)}
        />
        <Modal.Body>
          <Text>This modal takes up the entire screen</Text>
        </Modal.Body>
      </FullScreenModal>
    </>
  );
};

export const AlertDialogExample = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>Show Alert</Button>
      <AlertDialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        title="Alert"
        message="This is an important message!"
        buttons={[
          <Button key="ok" onPress={() => setVisible(false)}>OK</Button>
        ]}
      />
    </>
  );
};

export const ConfirmationDialogExample = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>Show Confirmation</Button>
      <ConfirmationDialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        title="Confirm Action"
        message="Are you sure you want to perform this action?"
        onConfirm={() => {
          console.log('Confirmed');
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      />
    </>
  );
};

export const FormModalExample = () => {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <>
      <Button onPress={() => setVisible(true)}>Open Form</Button>
      <Modal 
        visible={visible} 
        onDismiss={() => setVisible(false)}
        variant="form"
        keyboardAvoiding
      >
        <Modal.Header title="Form Modal" />
        <Modal.Body>
          <Input 
            label="Name"
            value={value}
            onChangeText={setValue}
            placeholder="Enter your name"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onPress={() => setVisible(false)}>
            Cancel
          </Button>
          <Button onPress={() => setVisible(false)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const ImperativeExample = () => {
  const modalRef = useRef<any>(null);

  return (
    <>
      <Button onPress={() => modalRef.current?.show()}>Open Modal</Button>
      <Modal ref={modalRef} onDismiss={() => console.log('Dismissed')}>
        <Modal.Header title="Imperative Modal" />
        <Modal.Body>
          <Text>This modal is controlled imperatively</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={() => modalRef.current?.hide()}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};