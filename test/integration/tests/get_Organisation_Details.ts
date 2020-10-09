import {mocha} from './test';
import {http} from './utils';

import { getAuthCode, getAuthToken} from './utils/getToken';

suite('API/CASES -> Get Organisation details', () => {
  mocha.timeout(10000);
  test('GET Manage Organisation details', async () => {
    try {

      const authCode = await getAuthCode();

      // const forState = await http.get('');
      // const response = await http.get('/oauth2/callback?code=' + authCode+ '&state=VN_dJGEkfbyY_fiBlsjk1Nfofu5BCV3Rr8p0b2Syip4&client_id=xuiwebapp&iss=https%3A%2F%2Fidam-web-public.aat.platform.hmcts.net%2Fo');
      console.log('*********** ', authCode );
    } catch (error) {
      console.log(error);
    }
  }).timeout(10000);
});
