// Core Packages
import {BumpaLogoWithText} from '@src/assets/svg';
import {ReactNode} from 'react';
import {Text} from 'react-native';
import {View, SafeAreaView, Platform} from 'react-native';
import Button from '../button';

// Styles
import {styles} from './style';

interface IProps {
  children: ReactNode;
  title: string;
  onPressBtn1?: any;
  onPressBtn2?: any;

  disableBtn1?: boolean;
  disableBtn2?: boolean;
}

const ScreenMain = ({
  children,
  title,
  onPressBtn1,
  onPressBtn2,
  disableBtn1,
  disableBtn2,
}: IProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.content,
          //   {marginBottom: Platform.OS === 'ios' ? 65 : 100},
        ]}>
        <View style={styles.header}>
          <BumpaLogoWithText />
        </View>
        <View style={styles.textWrapper}>
          <Button
            variant="outlined"
            style={{width: '50%', marginRight: 10}}
            label={title}
            onClick={onPressBtn1}
            disabled={disableBtn1}
          />
          <Button
            style={{width: '50%'}}
            variant="outlined"
            label="Transfer History"
            onClick={onPressBtn2}
            disabled={disableBtn2}
          />
        </View>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default ScreenMain;
