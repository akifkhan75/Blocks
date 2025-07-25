// import React, { useRef } from 'react';
// import { Button } from '../Button/Button';
// import { Toast, ToastManager } from './Toast';
// import { BlocksProvider } from '../../providers/BlocksProvider';
// import { DefaultTheme } from '../../themes/default';

// export default {
//   title: 'Components/Toast',
//   component: Toast,
//   decorators: [
//     (Story) => (
//       <BlocksProvider theme={DefaultTheme}>
//         <Story />
//       </BlocksProvider>
//     ),
//   ],
// };

// export const BasicUsage = () => {
//   const toastRef = useRef<any>(null);

//   const showToast = (type: 'success' | 'error' | 'warning' | 'info') => {
//     ToastManager.show({
//       message: `This is a ${type} toast`,
//       type,
//       duration: 3000,
//     });
//   };

//   return (
//     <>
//       <Button onPress={() => showToast('success')}>
//         Show Success Toast
//       </Button>
//       <Button onPress={() => showToast('error')}>
//         Show Error Toast
//       </Button>
//       <Button onPress={() => showToast('warning')}>
//         Show Warning Toast
//       </Button>
//       <Button onPress={() => showToast('info')}>
//         Show Info Toast
//       </Button>
//       <Toast ref={toastRef} />
//     </>
//   );
// };