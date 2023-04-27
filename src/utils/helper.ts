import {Dimensions} from 'react-native';

const DEVICE_SCALE_HEIGHT = Dimensions.get('window').height / 688;
const {height, width} = Dimensions.get('window');
const DEVICE_SCALE = Dimensions.get('window').width / 360;

const normalize = (size: number) => Math.round(DEVICE_SCALE * (size + 2));

export const formatAmount = (
  amount: String | Number,
  toWholeNumber = false,
) => {
  if (toWholeNumber) {
    const value = Math.round(Number(amount));
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  let formattedAmount = (+amount || 0).toFixed(2).toString();
  if (!formattedAmount.includes('.')) {
    formattedAmount = `${amount}.00`;
  }
  return formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const scale = {
  h: (size: number) => Math.round(DEVICE_SCALE_HEIGHT * size),
  w: normalize,
  screenHeight: (num: number) => (num / 100) * height,
  screenWidth: (num: number) => (num / 100) * width,
};

export const generateTransactionReference = (max: number) =>
  Math.floor(Math.random() * max) + 1;

export const formatAsInteger = (amount: string | number) =>
  parseInt(String(amount).split(',').join(''), 10);
