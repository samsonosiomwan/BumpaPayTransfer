// Core Packages
import {Platform, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// Custom Components
import ScreenMain from '@src/components/screen-main';
import Input from '@src/components/input';
import Button from '@src/components/button';
import AutoComplete from '@src/components/autocomplete';

// Utils
import useGetAccountDetails from '@src/network/react-query/queries/getAccountDetails';
import useGetBanks from '@src/network/react-query/queries/getBanks';
import useInitiateTransfer from '@src/network/react-query/mutations/postTransfer';
import {formatAsInteger, generateTransactionReference} from '@src/utils/helper';
import {CALL_BACK_URL} from '@src/network/services/apiRoutes';
import {CURRENCY} from '@src/utils/constants';
import {ROUTES} from '@src/navigation/routes';

// Styles
import {styles} from './style';

const TransferFunds = () => {
  const navigation = useNavigation<any>();
  const [selectedBank, setSelectedBank] = useState<Record<string, string>>();
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [accountName, setAccountName] = useState<string>('');
  const [amount, setAmount] = useState<string | number>('');
  const [customError, setCustomError] = useState<string>('');
  const [narration, setNarration] = useState<string>('');

  const {banks, loadingBanks} = useGetBanks();
  const {
    verifyAccount,
    accountDetails,
    isVerifyingAccount,
    isVerifyError,
    isVerified,
  } = useGetAccountDetails();
  const {initiateTransfer, isTransfering} = useInitiateTransfer();

  const onChangeAccountNo = (val: string) => setAccountNumber(val);

  const onChangeAmount = (val: string) => {
    const formattedAmount = formatAsInteger(val);
    if (formattedAmount < 100 || formattedAmount > 10000000) {
      setCustomError('Amount must not be less than 100 or Greater 10,000,000');
    } else {
      setCustomError('');
    }
    setAmount(formattedAmount);
  };

  useEffect(() => {
    if (accountNumber?.length === 10 && selectedBank?.code) {
      verifyAccount({
        account_number: accountNumber,
        account_bank: selectedBank?.code,
      });
    }
  }, [accountNumber?.length === 10]);

  useEffect(() => {
    if (isVerified) {
      setAccountName(`${accountDetails.account_name}`);
    }
  }, [isVerified, accountDetails.account_name]);

  const handleTransfer = () => {
    const transaction_ref = generateTransactionReference(3);
    const payload = {
      account_number: accountNumber,
      account_bank: accountName,
      amount: +amount,
      narration: narration,
      currency: CURRENCY,
      reference: `flx_${accountName + amount}_${transaction_ref}`,
      callback_url: `${CALL_BACK_URL}`,
      debit_currency: CURRENCY,
    };

    initiateTransfer(payload);
  };

  return (
    <ScreenMain
      title="Transfer Funds"
      onPressBtn2={() => {
        navigation.navigate(ROUTES.TRANSFER_HISTORY);
      }}
      disableBtn1={true}>
      <KeyboardAwareScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        extraScrollHeight={Platform.OS === 'ios' ? 10 : 0}
        keyboardShouldPersistTaps="always">
        <View style={styles.contentContainer}>
          <AutoComplete
            required
            label="Select Bank"
            titleKey="name"
            style={styles.textField}
            loading={loadingBanks}
            suggestions={banks}
            onSelect={setSelectedBank}
            threshold={1}
            styleInput={styles.input}
            showDropdown
            customError=""
          />
          <Input
            required
            type="accountNumber"
            style={styles.textField}
            styleInput={styles.input}
            label="Account Number"
            value={accountNumber}
            onChange={onChangeAccountNo}
            customError=""
          />
          {isVerifyingAccount && (
            <Text style={styles.validatingAccount}>
              Checking account name......
            </Text>
          )}
          {isVerifyError && !isVerifyingAccount && accountName !== '' ? (
            <Text style={styles.validatingAccount}>validation failed</Text>
          ) : null}
          {accountName && !isVerifyingAccount && accountName !== '' ? (
            <Text style={styles.accountName}>{accountName}</Text>
          ) : null}
          <Input
            required
            type="price"
            style={styles.textField}
            styleInput={styles.input}
            value={amount}
            label="Amount (₦)"
            onChange={onChangeAmount}
            customError={customError}
            maxLength={9}
          />
          <Input
            required
            style={styles.textField}
            styleInput={styles.input}
            label="Description"
            value={narration}
            onChange={setNarration}
            customError=""
          />
          <Button
            label={`${isVerifyingAccount ? 'Verifying...' : 'Transfer'}`}
            onClick={handleTransfer}
            disabled={
              loadingBanks ||
              !amount ||
              accountName === '' ||
              isVerifyingAccount ||
              customError !== '' ||
              narration === ''
            }
            loading={loadingBanks || isVerifyingAccount || isTransfering}
          />
        </View>
      </KeyboardAwareScrollView>
    </ScreenMain>
  );
};

export default TransferFunds;
