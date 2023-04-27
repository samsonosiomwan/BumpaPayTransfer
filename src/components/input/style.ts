// Core Components
import {Animated, StyleSheet} from 'react-native';

// Utils
import {COLORS, FONT} from '@src/utils/constants';

export const styles = StyleSheet.create({
  input: {
    minWidth: '100%',
    borderWidth: 1,
    borderRadius: 10,
    color: `${COLORS.accent}`,
    paddingHorizontal: 20,
    fontSize: FONT.normal,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: FONT.normal,
    color: `${COLORS.textColor}`,
  },
  errorFont: {
    marginTop: 4,
    marginLeft: 12,
    color: `${COLORS.danger}`,
    fontSize: FONT.small,
  },
  rightAdornment: {
    top: 0,
    right: 0,
    height: '100%',
    display: 'flex',
    position: 'absolute',
    marginRight: 16,
    justifyContent: 'center',
  },

  labelContainer: {
    top: 0,
    left: 0,
    marginLeft: 20,
    position: 'absolute',
    paddingHorizontal: 2,
    backgroundColor: COLORS.background,
  },
});
