import { I18nManager } from 'react-native';

export const isRTL = () => I18nManager.isRTL;

export const setRTL = (rtl: boolean) => {
  if (rtl !== I18nManager.isRTL) {
    I18nManager.forceRTL(rtl);
    // You might need to restart the app for changes to take effect
  }
};

export const getStyleForRTL = (rtlStyle: any, ltrStyle: any = {}) => {
  return I18nManager.isRTL ? rtlStyle : ltrStyle;
};