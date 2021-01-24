import { expect } from 'chai';
import {http} from './utils';

import Request from './utils/request';

describe('nodeApp endpoint', () => {
  const userName = 'lukesuperuserxui@mailnesia.com';
  const password = 'Monday01';

  // const userName = 'peterxuisuperuser@mailnesia.com';
  // const password = 'Monday01';

  beforeEach(() => {
    Request.clearSession();
  });


  it('external/configuration-ui', async () => {
    const response = await Request.get('external/configuration-ui', null);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.all.keys('clientId', 'idamWeb', 'launchDarklyClientId', 'oAuthCallback', 'oidcEnabled', 'protocol');
    expect(response.data.launchDarklyClientId).to.equal('5de6610b23ce5408280f2268');
    expect(response.data.clientId).to.equal('xuiwebapp');
  });

  it('auth/isAuthenticated with session cookies', async () => {
    await Request.withSession(userName, password);
    const response = await Request.get('auth/isAuthenticated', null);
    expect(response.status).to.equal(200);
    expect(response.data).to.equal(true);
  });

  it('auth/isAuthenticated without session cookies', async () => {
    const response = await Request.get('auth/isAuthenticated', null);
    expect(response.status).to.equal(200);
    expect(response.data).to.equal(false);
  });


  it('api/user/details', async () => {
    await Request.withSession(userName, password);
    const response = await Request.get('api/user/details', null);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.all.keys('canShareCases', 'sessionTimeout','userInfo');
    expect(response.data.userInfo).to.have.all.keys('id', 'forename', 'surname','email','active','roles');
    expect(response.data.userInfo.roles).to.be.an('array');

  });

  it('api/user/details without session', async () => {
    const response = await Request.get('api/user/details', null);
    expect(response.data).to.have.lengthOf.above(5);
  });


  it('api/configuration?configurationKey=xxx', async () => {
    await Request.withSession(userName, password);
    const response = await Request.get('api/configuration?configurationKey=termsAndConditionsEnabled', null);
    console.log(response.data);

    expect(JSON.stringify(response.data)).to.have.lengthOf.below(6);
  });

  
});
