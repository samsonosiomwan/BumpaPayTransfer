import {COLORS, FONT} from '@src/utils/constants';
import {scale} from '@src/utils/helper';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: scale.w(20),
    marginVertical: scale.w(30),
    flex: 1,
  },

  itemWrapper: {
    marginVertical: scale.w(10),
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    flexDirection: 'row',
    paddingHorizontal: scale.w(20),
    paddingVertical: scale.w(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewDetailsWrapper: {
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    paddingHorizontal: scale.w(15),
    paddingVertical: scale.w(5),
  },
  viewDetails: {
    fontSize: FONT.medium,
    color: COLORS.white,
    fontWeight: '700',
  },
  statusFailed: {
    fontSize: FONT.small,
    color: COLORS.danger,
    fontWeight: '700',
  },
  statusSuccess: {
    fontSize: FONT.small,
    color: COLORS.primary,
    fontWeight: '700',
  },
  amount: {
    fontSize: FONT.medium,
    color: COLORS.black01,
    fontWeight: '700',
  },

  historyDetailsWrapper: {
    marginHorizontal: scale.w(20),
    marginVertical: scale.w(30),
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailsWrapper: {
    backgroundColor: COLORS.white,
    width: '100%',
    paddingHorizontal: scale.w(20),
    paddingVertical: scale.w(5),
    borderRadius: 16,
    borderColor: COLORS.primary,
  },
  details: {
    marginVertical: scale.w(30),
  },
  shadowProp: {
    shadowOffset: {width: -5, height: 10},
    shadowColor: COLORS.accent,
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  detailsWrapper2: {
    width: '100%',
    paddingHorizontal: scale.w(20),
    paddingVertical: scale.w(10),
    marginTop: scale.w(10),
    borderRadius: 16,
    borderColor: COLORS.primary,
  },
});
