import {COLORS} from '@src/utils/constants';
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';
import {styles} from './style';

interface IProps {
  label: string;
  onClick: () => void;
  style?: object;
  disabled?: boolean;
  variant?: string;
  textStyle?: object;
  loading?: boolean;
}

const Button = ({
  label,
  onClick,
  style = {},
  textStyle = {},
  disabled = false,
  variant = 'default',
  loading,
}: IProps) => {
  switch (variant) {
    case 'outlined':
      return (
        <TouchableOpacity
          style={[styles.outlinedButton, style]}
          disabled={disabled}
          onPress={onClick}>
          <Text
            style={[
              styles.labelOutlined,
              {
                color: disabled ? `${COLORS.accent}` : COLORS.primary,
              },
            ]}>
            {label}
          </Text>
          {loading && <ActivityIndicator />}
        </TouchableOpacity>
      );
    case 'default':
    default:
      return (
        <TouchableOpacity
          style={[
            styles.button,
            {
              borderColor: disabled
                ? `${COLORS.primary}`
                : `${COLORS.secondary}`,
            },
            {
              backgroundColor: disabled ? COLORS.disabled : COLORS.primary,
            },
          ]}
          disabled={disabled}
          onPress={onClick}>
          <Text
            style={[
              textStyle,
              styles.label,
              {
                color: disabled ? `${COLORS.accentLight}` : COLORS.white,
              },
            ]}>
            {label}
          </Text>
          {loading && <ActivityIndicator />}
        </TouchableOpacity>
      );
  }
};

export default Button;
