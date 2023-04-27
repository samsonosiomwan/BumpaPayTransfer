/* eslint-disable react/jsx-no-useless-fragment */
// Core Component
import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Utils
import {COLORS, FONT} from '@src/utils/constants';
import {ChevronDown, ChevronUp, CloseIcon} from '@src/assets/svg';

import {ITextFieldProps} from '@src/utils/interface';
import styles from './style';

const AutoComplete = ({
  label,
  loading,
  customError,
  required = false,
  requiredErrorMessage = 'This field is required.',
  value = '',
  style,
  onBlur,
  onFocus,
  disabled,
  onChange = () => {},
  onSelect = () => {},
  onEmpty = () => {},
  suggestions = [],
  titleKey = 0,
  children,
  threshold = 1,
  setPersistTap = () => {},
  labelOut = false,
  placeholder,
  styleInput,
  showDropdown = false,
  editable = true,
  hideRightArrow = false,
  maxScrollHeight = 300,
}: ITextFieldProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(labelOut);
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState(customError);

  const inputRef: any = useRef(null);
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

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!inputValue ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, inputValue]);

  useEffect(() => {
    if (isFocused) {
      if (suggestions?.length) setShowSuggestions(true);
      else setShowSuggestions(false);
      if (inputValue?.length >= threshold) setShowSuggestions(true);
      else setShowSuggestions(false);
    }
  }, [inputValue, suggestions]);

  const handleChange = (value: string) => {
    if (value) {
      setError('');
    }
    inputRef?.current?.focus();
    setInputValue(value);
    onChange(value);
  };

  const onClose = (event?: ChangeEvent) => {
    setPersistTap('never');
    setIsFocused(labelOut);
    if (required && !inputValue) {
      setError(requiredErrorMessage);
    } else {
      setError('');
    }

    inputRef?.current?.blur();
    onBlur?.(event);
  };

  const onChevronUp = () => {
    if (showDropdown) {
      setShowSuggestions(false);
    }
    onClose();
  };

  const onOpen = (event?: ChangeEvent) => {
    if (showDropdown) setShowSuggestions(true);
    setPersistTap('always');
    setIsFocused(true);
    inputRef?.current?.focus();
    onFocus?.(event);
  };

  const onClear = () => {
    setInputValue('');
    onChange('');
    onSelect({});
    onEmpty();
    onClose();
  };

  const onSelectSuggestions = (item: Record<string, string>) => {
    onChange(item[titleKey]);
    onSelect({id: item._id, title: item[titleKey], ...item});
    setInputValue(item[titleKey]);
    onClose();
    setShowSuggestions(false);
  };

  let color = labelOut
    ? COLORS.borderColor
    : isFocused
    ? COLORS.primary
    : COLORS.background;
  if (error) {
    color = COLORS.danger;
  }

  const SuggestionLayer = () => {
    const rows = suggestions
      ?.filter((item: any) => {
        const regex = new RegExp(`${inputValue}`, 'gi');
        return item[titleKey]?.match(regex);
      })
      .map((item: any) => (
        <View style={styles.suggestionLayerWrapper}>
          <Text
            style={styles.suggestionsRowContainer}
            onPress={() => onSelectSuggestions(item)}
            key={item._id}>
            {item[titleKey]}
          </Text>
        </View>
      ));
    if (suggestions.length)
      return (
        <View style={styles.suggestionsContainer}>
          <ScrollView
            keyboardShouldPersistTaps="always"
            style={{
              flex: 1,
              maxHeight: maxScrollHeight,
              width: '100%',
            }}
            contentContainerStyle={{alignItems: 'center', flexGrow: 1}}
            nestedScrollEnabled>
            {loading ? (
              <Text
                style={[styles.suggestionsRowContainer, {textAlign: 'center'}]}>
                Loading ...
              </Text>
            ) : (
              <>
                {children}
                {rows}
              </>
            )}
          </ScrollView>
        </View>
      );
    return (
      <View
        style={[
          styles.suggestionsContainer,
          {borderWidth: !showDropdown ? 0 : 0.7},
        ]}>
        {children}
      </View>
    );
  };

  const ArrowIcon = () => {
    if (
      (inputValue && !showSuggestions) ||
      (inputValue?.length > 0 && inputValue?.length < threshold)
    )
      return (
        <TouchableOpacity style={{padding: 15}} onPress={onClear}>
          <CloseIcon />
        </TouchableOpacity>
      );
    if (showSuggestions)
      return (
        <TouchableOpacity style={{padding: 15}} onPress={onChevronUp}>
          <ChevronUp />
        </TouchableOpacity>
      );
    return (
      <TouchableOpacity style={{padding: 15}} onPress={onOpen}>
        <ChevronDown />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: color,
            ...styleInput,
            paddingLeft: 20,
          },
          {backgroundColor: disabled ? COLORS.disabled : 'transparent'},
        ]}
        ref={inputRef}
        value={inputValue || ''}
        onBlur={onClose}
        onFocus={onOpen}
        onChangeText={handleChange}
        returnKeyType="done"
        placeholder={placeholder}
        editable={disabled ? false : editable}
        selectTextOnFocus={!disabled}
      />
      {!disabled && showSuggestions ? <SuggestionLayer /> : null}
      <View
        style={[
          styles.rightAdornment,
          {paddingBottom: !!error || !!customError ? 20 : 0},
        ]}>
        {disabled || hideRightArrow ? null : <ArrowIcon />}
        {disabled && (
          <TouchableOpacity style={{padding: 15}} onPress={onOpen}>
            <ChevronDown />
          </TouchableOpacity>
        )}
      </View>
      <TouchableWithoutFeedback onPress={() => inputRef?.current?.focus()}>
        <Animated.View style={[styles.labelContainer, focusAnimStyle]}>
          <Text style={styles.label}>
            {label}
            {error ? '*' : ''}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      {!disabled && error ? (
        <Text style={styles.error}>{customError || error}</Text>
      ) : null}
    </View>
  );
};

export default AutoComplete;
