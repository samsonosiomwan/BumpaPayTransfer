import getAccountDetails from '@src/network/services/getBankDetails';
import getBanksService from '@src/network/services/getBanksService';
import {useState} from 'react';
import {Alert} from 'react-native';
import {useMutation} from 'react-query';

const useGetAccountDetails = () => {
  const [accountDetails, setAccountDetails] = useState<Record<string, string>>(
    {},
  );

  const verifyAccountMutation = useMutation(
    '@accountDetails',
    getAccountDetails,
    {
      onSuccess: data => {
        setAccountDetails(data.data.data);
      },

      onError: (error: any) => {
        Alert.alert(`${error.response.data.message}`);
      },
    },
  );

  const {
    mutate: verifyAccount,
    isLoading: isVerifyingAccount,
    isError: isVerifyError,
    isSuccess: isVerified,
  } = verifyAccountMutation;

  return {
    verifyAccount,
    isVerifyingAccount,
    isVerifyError,

    accountDetails,
    isVerified,
  };
};

export default useGetAccountDetails;
