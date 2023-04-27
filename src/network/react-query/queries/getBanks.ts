import getBanksService from '@src/network/services/getBanksService';
import {useState} from 'react';
import {useQuery} from 'react-query';

const useGetBanks = () => {
  const [banks, setBanks] = useState<object[]>([]);
  const [banksError, setBanksError] = useState('');

  const {isLoading: loadingBanks, isError: isBankError} = useQuery(
    '@banks',
    getBanksService,

    {
      onSuccess: (data: Record<string, any>) => {
        setBanks(data?.data?.data);
      },
      onError: (error: any) => {
        setBanksError(error);
      },
    },
  );

  return {
    banks,
    banksError,
    loadingBanks,
    isBankError,
  };
};

export default useGetBanks;
