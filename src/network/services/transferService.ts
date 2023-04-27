import axios from 'axios';
import {BASE_URL, TRANSFER} from './apiRoutes';
import {HEADERS} from './config';

interface IPayload {
  account_number: string;
  account_bank: string;
  amount: number;
  narration: string;
  currency: string;
  reference: string;
  callback_url: string;
  debit_currency: string;
}

export const initiateTransferService = async (payload: IPayload) => {
  const response = await axios.post(`${BASE_URL + TRANSFER}`, payload, HEADERS);
  return response;
};

export const getTransfersService = async (id?: string) => {
  const url = id ? `${BASE_URL + TRANSFER}/${id}` : `${BASE_URL + TRANSFER}`;
  const response = await axios.get(`${url}`, HEADERS);
  return response;
};

export default initiateTransferService;
