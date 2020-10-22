import { expect } from 'chai';
import {mocha} from './test';
import {http} from './utils';
import { getHeaderWithCookies} from './utils/authUtil';

suite('nodeApp endpoint', () => {
  const userName = 'lukesuperuserxui@mailnesia.com';
  const password = 'Monday01';

  // const userName = 'peterxuisuperuser@mailnesia.com';
  // const password = 'Monday01';

  mocha.timeout(20000);
  test('external/configuration-ui', async () => {
    const response = await http.get('external/configuration-ui');
    expect(response.status).to.equal(200);
    expect(response.data).to.have.all.keys('clientId', 'idamWeb', 'launchDarklyClientId', 'oAuthCallback', 'oidcEnabled', 'protocol');
    expect(response.data.launchDarklyClientId).to.equal('5de6610b23ce5408280f2268');
    expect(response.data.clientId).to.equal('xuiwebapp');
  }).timeout(30000);

  test('auth/isAuthenticated with session cookies', async () => {
    const headerWithCookies = await getHeaderWithCookies(userName, password);
    const response = await http.get('auth/isAuthenticated', headerWithCookies);
    expect(response.status).to.equal(200);
    expect(response.data).to.equal(true);
  }).timeout(30000);

  test('auth/isAuthenticated without session cookies', async () => {
    const response = await http.get('auth/isAuthenticated');
    expect(response.status).to.equal(200);
    expect(response.data).to.equal(false);
  }).timeout(30000);


  test('api/user/details', async () => {
    const headerWithCookies = await getHeaderWithCookies(userName, password);
    const response = await http.get('api/user/details', headerWithCookies);
    console.log(response.data);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.all.keys( 'sessionTimeout');
  }).timeout(30000);

  test('api/user/details without session', async () => {
    const response = await http.get('api/user/details');
    expect(response.data).to.have.lengthOf.above(5);
  }).timeout(30000);


  test('api/configuration?configurationKey=xxx', async () => {
    const headerWithCookies = await getHeaderWithCookies(userName, password);
    const response = await http.get('api/configuration?configurationKey=termsAndConditionsEnabled', headerWithCookies);
    console.log(response.data);

    expect(JSON.stringify(response.data)).to.have.lengthOf.below(6);
  }).timeout(30000);
});
