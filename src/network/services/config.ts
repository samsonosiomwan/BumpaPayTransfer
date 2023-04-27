import {FLUTTER_TEST_SECRET_KEY} from './apiRoutes';

export const HEADERS = {
  headers: {Authorization: `Bearer ${FLUTTER_TEST_SECRET_KEY}`},
};
