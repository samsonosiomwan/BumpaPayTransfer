// Core Components
import {StyleSheet} from 'react-native';

// Utils
import {COLORS, FONT} from '@src/utils/constants';

export const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  label: {
    lineHeight: 19,
    color: COLORS.white,
    fontSize: FONT.medium,
    fontWeight: '600',
  },
  labelOutlined: {
    lineHeight: 19,
    color: COLORS.primary,
    fontSize: FONT.medium,
    fontWeight: '600',
  },
  outlinedButton: {
    width: '100%',
    height: 30,
    zIndex: -100,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 16,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    marginTop: 20,
    borderColor: COLORS.primary,
  },
  outlinedFONT: {
    lineHeight: 19,
    fontSize: FONT.medium,
  },
});
