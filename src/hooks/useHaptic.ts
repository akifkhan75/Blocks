// import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export const useHaptic = () => {
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'medium') => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };

    let feedbackType;
    switch (type) {
      case 'light':
        feedbackType = 'impactLight';
        break;
      case 'heavy':
        feedbackType = 'impactHeavy';
        break;
      default:
        feedbackType = 'impactMedium';
    }

    // ReactNativeHapticFeedback.trigger(feedbackType, options);
  };

  return { triggerHaptic };
};