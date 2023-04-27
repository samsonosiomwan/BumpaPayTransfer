// Core Component
import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
  Text,
} from 'react-native';

// Utils
import {
  ALPHA_REGEX,
  PHONE_REGEX,
  NUMBER_REGEX,
  COLORS,
} from '@src/utils/constants';
import {formatAmount} from '@src/utils/helper';

// Styles
import {styles} from './style';
import {ITextFieldProps} from '@src/utils/interface';

const TextField = ({
  label,
  value,
  style,
  onBlur,
  onFocus,
  customError,
  height = 50,
  type = 'text',
  required = false,
  disabled = false,
  showError = true,
  multiline = false,
  onChange = (val?: string | number) => {},
  rightAdornment = null,
  requiredErrorMessage = 'This field is required.',
  placeholder,
  labelOut = false,
  styleInput,
  maxLength,
}: ITextFieldProps) => {
  const [isFocused, setIsFocused] = useState(labelOut);
  const [inputValue, setValue] = useState<number | string>(value || '');
  const [error, setError] = useState<null | string>(customError);

  const validatePhone = (value: string) =>
    value.length === 11 && PHONE_REGEX.test(value);
  const formatPhone = (val: string) =>
    (val[0] === '0' ? val : `0${val}`).substr(0, 11);
  const formatAccountNumber = (val: string) =>
    (val[0] === '0' ? val : `${val}`).substr(0, 10);

  const inputRef = useRef<any>(null);
  const focusAnim = useRef(new Animated.Value(0)).current;
  const focusAnimStyle = {
    transform: [
      {
        translateY: focusAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [16, -12],
        }),
      },
      {
        translateX: focusAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0],
        }),
      },
    ],
  };

  const getKeyboardType = () => {
    let result = 'default';
    switch (type) {
      case 'phone':
      case 'price':
      case 'number':
      case 'accountNumber':
        result = 'numeric';
        break;
      case 'email':
        result = 'email-address';
        break;
      case 'alpha':
      default:
        result = 'default';
    }
    return result;
  };

  const keyboardType: any = getKeyboardType();
  const isAndroid = Platform.OS === 'android';

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, value]);

  let color = COLORS.borderColor;
  if (error && showError) {
    color = COLORS.danger;
  }

  const onValueChange = (val: string) => {
    if (type === 'phone') {
      if (!PHONE_REGEX.test(val) && !NUMBER_REGEX.test(val)) {
        return;
      }
      const formattedPhone = val ? formatPhone(val) : val;
      setValue(formattedPhone);
      if (onChange) {
        onChange(formattedPhone);
      }
      if (error && validatePhone(formattedPhone)) {
        setError(null);
      }
    } else if (type === 'number') {
      if (!NUMBER_REGEX.test(val)) {
        return;
      }
      if (onChange) {
        onChange(val);
      }
      if (required) {
        setError(val ? null : requiredErrorMessage);
      }
    } else if (type === 'accountNumber') {
      if (!PHONE_REGEX.test(val) && !NUMBER_REGEX.test(val)) {
        return;
      }
      const formattedAccountNumber = val ? formatAccountNumber(val) : val;
      setValue(formattedAccountNumber);
      if (onChange) {
        onChange(formattedAccountNumber);
      }
      if (required) {
        setError(val ? null : requiredErrorMessage);
      }
    } else if (type === 'alpha' && val !== '') {
      if (!ALPHA_REGEX.test(val)) {
        return;
      }
      if (onChange) {
        onChange(val);
      }
      if (required) {
        setError(val ? null : requiredErrorMessage);
      }
    } else if (type === 'price') {
      const actualVal: any = Number(String(val).split(',').join(''));
      if (actualVal < 100 || actualVal > 10000000) {
        setError(
          'Invalid amount, it should not be less than N100 and greater than N1000000',
        );
      }
      if (!NUMBER_REGEX.test(actualVal)) {
        return;
      }
      if (onChange) {
        const formattedAmount = actualVal
          ? formatAmount(actualVal, true)
          : actualVal;
        onChange(formattedAmount);
      }
      if (required) {
        setError(val ? null : requiredErrorMessage);
      }
    } else {
      if (onChange) {
        onChange(type === 'email' ? val.toLowerCase() : val);
      }
      if (required) {
        setError(val ? null : requiredErrorMessage);
      }
    }
  };

  const onInputBlur = (event: ChangeEvent) => {
    setIsFocused(labelOut);
    if (required && !inputValue) {
      setError(requiredErrorMessage);
    }
    // if (type === 'phone' && inputValue && inputValue.length !== 11) {
    //   setError('Invalid phone number');
    // }
    // if (type === 'email' && inputValue && !EMAIL_REGEX.test(inputValue)) {
    //   setError('Invalid email address');
    // }
    if (
      type === 'price' &&
      inputValue &&
      !NUMBER_REGEX.test(String(inputValue).split(',').join(''))
    ) {
      setError('Invalid value');
    }
    onBlur?.(event);
  };

  const onInputFocus = (event: ChangeEvent) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  useEffect(() => {
    setValue(value || '');
    if (value && error && error === requiredErrorMessage) {
      setError('');
    }
  }, [error, requiredErrorMessage, value]);
  useEffect(() => setError(customError), [customError]);

  const inputStyle = {
    height,
    borderColor: color,
    backgroundColor: disabled ? COLORS.disabled : 'transparent',
    textAlignVertical: 'top',
  };

  return (
    <View style={style}>
      <TextInput
        style={[
          styles.input,
          inputStyle,
          {
            lineHeight: multiline || isAndroid ? 22 : 0,
          },
          styleInput,
        ]}
        ref={inputRef}
        multiline={multiline}
        value={value}
        keyboardType={keyboardType}
        onBlur={onInputBlur}
        onChangeText={onValueChange}
        onFocus={onInputFocus}
        editable={!disabled}
        selectTextOnFocus={!disabled}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <View
        style={[
          styles.rightAdornment,
          {paddingBottom: error || customError ? 20 : 0},
        ]}>
        {rightAdornment && rightAdornment()}
      </View>
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <Animated.View style={[focusAnimStyle, styles.labelContainer]}>
          <Text style={styles.label}>
            {label}
            {error ? '*' : ''}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {error || customError ? (
        <Text style={styles.errorFont}>{customError || error}</Text>
      ) : null}
    </View>
  );
};

export default TextField;
