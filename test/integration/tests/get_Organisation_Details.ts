import {mocha} from './test';
import {http} from './utils';
import { getHeaderWithCookies} from './utils/authUtil';


suite('API/CASES -> Get Organisation details', () => {
  mocha.timeout(20000);
  test('GET Manage Organisation details', async () => {
    try {

      const response = await http.get('external/configuration-ui');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }).timeout(30000);

  test('GET Manage Organisation details', async () => {
    const headerWithCookies = await getHeaderWithCookies('lukesuperuserxui@mailnesia.com', 'Monday01');
    const response = await http.get('auth/isAuthenticated', headerWithCookies);
    console.log(response.data);
  }).timeout(30000);

  test('GET Manage Organisation details', async () => {
    const headerWithCookies = await getHeaderWithCookies( 'lukesuperuserxui@mailnesia.com', 'Monday01');
    const response = await http.get('api/user/details', headerWithCookies);
    console.log(response.data);
  }).timeout(30000);

  test('GET Manage Organisation details', async () => {
    const headerWithCookies = await getHeaderWithCookies( 'lukesuperuserxui@mailnesia.com', 'Monday01');
    const response = await http.get('aggregated/caseworkers/:uid/jurisdictions?access=read', headerWithCookies);
    console.log(response.data);
  }).timeout(30000);
});
