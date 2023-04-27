import {COLORS, FONT} from '@src/utils/constants';
import {scale} from '@src/utils/helper';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  textField: {
    width: '100%',
    marginBottom: 17,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    zIndex: -1,
  },
  contentContainer: {
    marginHorizontal: scale.w(40),
    marginVertical: scale.w(30),
  },
  validatingAccount: {
    marginBottom: scale.h(3),
    textAlign: 'right',
    fontSize: FONT.small,
  },
  accountName: {
    marginBottom: scale.h(3),
    textAlign: 'right',
    color: COLORS.primary,
    fontSize: FONT.normal,
    textTransform: 'capitalize',
  },
});
