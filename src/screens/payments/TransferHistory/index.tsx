// Core Packages
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  useWindowDimensions,
  ScrollView,
} from 'react-native';

// Custom Components
import ScreenMain from '@src/components/screen-main';

// Utils
import {ROUTES} from '@src/navigation/routes';
import useGetTransfers from '@src/network/react-query/queries/getTransfers';
import {formatAmount} from '@src/utils/helper';

// Styles
import {styles} from './style';
import {useState} from 'react';
import Button from '@src/components/button';
import {useEffect} from 'react';

const TransferHistory = () => {
  const navigation = useNavigation<any>();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [transferId, setTransferId] = useState<string>('');

  const {transfers, loadingTransfers, isFetching, refetch} = useGetTransfers(
    `${transferId}`,
  );
  const {height: windowHeight} = useWindowDimensions();

  const handleCloseModal = () => {
    refetch();
    setShowModal(false);
    setTransferId('');
  };

  useEffect(() => {
    if (transferId) {
      refetch();
    }
  }, [transferId]);

  const renderItems = ({item}: any) => (
    <TouchableOpacity
      style={styles.itemWrapper}
      onPress={() => {
        setShowModal(true);
        setTransferId(item.id);
      }}>
      <View>
        <Text style={styles.text}>Name: {item?.bank_code}</Text>
        <Text style={styles.text}>
          Amt: {''}
          <Text style={styles.amount}>{`₦${formatAmount(item?.amount)}`}</Text>
        </Text>

        <Text
          style={
            item.status === 'FAILED'
              ? styles.statusFailed
              : styles.statusSuccess
          }>
          {item.status}
        </Text>
      </View>
      <View style={styles.viewDetailsWrapper}>
        <Text style={styles.viewDetails}>Details</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <ScreenMain
      title="Transfer Funds"
      onPressBtn1={() => {
        navigation.navigate(ROUTES.TRANSFER_FUNDS);
      }}
      disableBtn2={true}>
      {loadingTransfers || (isFetching && <ActivityIndicator />)}
      <View style={styles.contentContainer}>
        <FlatList
          data={transfers}
          renderItem={renderItems}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={handleCloseModal}
        onDismiss={handleCloseModal}>
        <ScrollView bounces={false} keyboardShouldPersistTaps="never">
          <View
            style={[
              {minHeight: windowHeight - 90},
              styles.historyDetailsWrapper,
            ]}>
            <View style={[styles.detailsWrapper, styles.shadowProp]}>
              <View style={styles.details}>
                {isFetching && <ActivityIndicator />}
                <Text
                  style={[
                    styles.amount,
                    {textAlign: 'center', paddingHorizontal: 10},
                  ]}>
                  Transaction Details
                </Text>
                <View style={styles.detailsWrapper2}>
                  <Text style={styles.text}>
                    Name: {`${transfers?.bank_code}`}
                  </Text>
                  <Text style={styles.text}>
                    Account: {`${transfers.account_number}`}
                  </Text>
                  <Text style={styles.text}>
                    Amount: {`₦${transfers.amount}`}
                  </Text>
                  <Text style={styles.text}>
                    Status:{' '}
                    <Text
                      style={
                        transfers.status === 'FAILED'
                          ? styles.statusFailed
                          : styles.statusSuccess
                      }>
                      {transfers.status}
                    </Text>
                  </Text>
                  <Text style={styles.text}>
                    Transaction Fee: {`₦${transfers.fee}`}
                  </Text>
                </View>
              </View>
              <Button label="Continue" onClick={handleCloseModal} />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </ScreenMain>
  );
};

export default TransferHistory;
