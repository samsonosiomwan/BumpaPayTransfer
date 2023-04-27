import {StyleSheet} from 'react-native';
import {COLORS, FONT} from '@src/utils/constants';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 1000,
  },
  rightAdornment: {
    position: 'absolute',
    top: 0,
    marginRight: 64,
    right: 0,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  error: {
    marginTop: 4,
    marginLeft: 12,
    fontSize: FONT.small,
    color: COLORS.danger,

    zIndex: -100,
  },
  label: {
    fontSize: FONT.normal,
    color: COLORS.accentLight,
  },
  labelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 2,
    marginLeft: 20,
    zIndex: 10,
    backgroundColor: COLORS.white,
  },
  suggestionLayerWrapper: {
    textAlign: 'left',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },
  suggestionIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginLeft: 50,
  },
  defaultIconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f2f2f2',
    marginLeft: 50,
    justifyContent: 'center',
    paddingHorizontal: 7.5,
  },

  suggestionsContainer: {
    flex: 1,
    zIndex: 1000,
    width: '100%',
    marginTop: 60,
    borderWidth: 0.7,
    borderRadius: 16,
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderColor: COLORS.borderColor,
  },
  suggestionsRowContainer: {
    width: '100%',
    borderWidth: 0,
    paddingLeft: 17,
    textAlign: 'left',
    paddingTop: 15,
    paddingBottom: 13,
    color: COLORS.accent,
    fontSize: FONT.medium,
    fontWeight: '600',
    backgroundColor: 'transparent',
    borderColor: COLORS.accentLight,
    borderBottomColor: 'transparent',
  },
  input: {
    minWidth: '100%',
    borderWidth: 1,
    borderRadius: 10,

    fontSize: FONT.medium,
    color: COLORS.accent,
    backgroundColor: 'transparent',
    height: 50,
  },

  leftAdornment: {
    position: 'absolute',
    top: 0,
    marginLeft: 25,
    left: 0,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
  },
});

export default styles;
