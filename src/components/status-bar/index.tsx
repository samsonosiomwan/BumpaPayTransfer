import React from 'react';
import {View, StatusBar, Platform, ColorValue} from 'react-native';

interface IProps {
  backgroundColor: ColorValue;
}
const StatusBarColored = ({backgroundColor, ...props}: IProps) => {
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 60 : StatusBar.currentHeight;
  return (
    <View style={{height: STATUSBAR_HEIGHT, backgroundColor}}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={backgroundColor}
        {...props}
      />
    </View>
  );
};

export default StatusBarColored;
