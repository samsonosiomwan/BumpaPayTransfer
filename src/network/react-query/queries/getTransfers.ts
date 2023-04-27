// Core Packages
import {useState} from 'react';
import {Alert} from 'react-native';
import {useQuery} from 'react-query';

// services
import {getTransfersService} from '@src/network/services/transferService';

const useGetTransfers = (id?: string) => {
  const [transfers, setTransfers] = useState<any>([]);

  const {
    isLoading: loadingTransfers,
    isError: isTransferError,
    refetch,
    isFetching,
  } = useQuery(
    '@transfers',
    () => getTransfersService(id),

    {
      onSuccess: (data: Record<string, any>) => {
        setTransfers(data?.data?.data);
      },
      onError: (error: any) => {
        Alert.alert(`${error?.response?.data?.message}`);
      },
    },
  );

  return {
    transfers,
    isTransferError,
    loadingTransfers,
    refetch,
    isFetching,
  };
};

export default useGetTransfers;
