import initiateTransferService from '@src/network/services/transferService';
import {useState} from 'react';
import {Alert} from 'react-native';
import {useMutation} from 'react-query';

const useInitiateTransfer = () => {
  const [data, setData] = useState<Record<string, string>>({});

  const verifyAccountMutation = useMutation(
    '@transfer',
    initiateTransferService,
    {
      onSuccess: data => {
        setData(data.data.data);
      },

      onError: (error: any) => {
        Alert.alert(`${error.response.data.message}`);
      },
    },
  );

  const {
    mutate: initiateTransfer,
    isLoading: isTransfering,
    isError: isTrasferError,
    isSuccess: isTrasfered,
  } = verifyAccountMutation;

  return {
    initiateTransfer,
    isTransfering,
    isTrasferError,
    data,
    isTrasfered,
  };
};

export default useInitiateTransfer;
