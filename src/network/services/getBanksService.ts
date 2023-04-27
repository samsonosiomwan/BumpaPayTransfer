import axios from 'axios';
import {BASE_URL, GET_BANKS} from './apiRoutes';
import {HEADERS} from './config';

const getBanksService = async () => {
  const response = await axios.get(`${BASE_URL + GET_BANKS}`, HEADERS);
  return response;
};

export default getBanksService;
