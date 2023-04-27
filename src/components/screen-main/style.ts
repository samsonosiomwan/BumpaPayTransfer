import {FONT} from '@src/utils/constants';
import {COLORS} from '@src/utils/constants/colors';
import {scale} from '@src/utils/helper';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${COLORS.background};`,
  },
  content: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 14,
    backgroundColor: `${COLORS.background}`,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',

    fontSize: FONT.medium,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 30,
  },
  textWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: scale.w(40),
  },
});
