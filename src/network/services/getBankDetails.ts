import axios from 'axios';
import {BASE_URL, VERIFY_BANK_ACCOUNT} from './apiRoutes';
import {HEADERS} from './config';

interface IPayload {
  account_number: string;
  account_bank: string;
}
const getAccountDetails = async (payload: IPayload) => {
  const response = await axios.post(
    `${BASE_URL + VERIFY_BANK_ACCOUNT}`,
    payload,
    HEADERS,
  );
  return response;
};

export default getAccountDetails;
