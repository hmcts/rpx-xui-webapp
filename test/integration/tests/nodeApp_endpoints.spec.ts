import { expect } from 'chai';
import {http} from './utils';

import Request from './utils/request';
import { setTestContext } from './utils/helper';

const nodeAppDataModels = require('../../dataModels/nodeApp')

describe('nodeApp endpoint', () => {
  const userName = 'lukesuperuserxui@mailnesia.com';
  const password = 'Monday01';

  // const userName = 'peterxuisuperuser@mailnesia.com';
  // const password = 'Monday01';

  beforeEach(function ()  {
    this.timeout(120000);

    setTestContext(this);
    Request.clearSession();
  });


  it('external/configuration-ui', async () => {
    const response = await Request.get('external/configuration-ui', null, 200);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.all.keys('clientId', 'idamWeb', 'launchDarklyClientId', 'oAuthCallback', 'oidcEnabled', 'protocol','ccdGatewayUrl');
    expect(response.data.launchDarklyClientId).to.equal('5de6610b23ce5408280f2268');
    expect(response.data.clientId).to.equal('xuiwebapp');
  });

  it('auth/isAuthenticated with session cookies', async () => {
    await Request.withSession(userName, password);
    const response = await Request.get('auth/isAuthenticated', null, 200);
    expect(response.status).to.equal(200);
    expect(response.data).to.equal(true);
  });

  it('auth/isAuthenticated without session cookies', async () => {
    const response = await Request.get('auth/isAuthenticated', null, 200);
    expect(response.status).to.equal(200);
    expect(response.data).to.equal(false);
  });


  it('api/user/details', async () => {
    await Request.withSession(userName, password);
    const configRes = await Request.get('external/configuration-ui', null, 200);

    const response = await Request.get('api/user/details', null, 200);
    expect(response.status).to.equal(200);


    const actualLocationObjKeys = response.data;

    const expectedUserDetailsObj_oidc = nodeAppDataModels.getUserDetails_oidc();

    expect(actualLocationObjKeys).to.include.members(Object.keys(expectedUserDetailsObj_oidc));

    if (actualLocationObjKeys.locationInfo.length > 0){
      expect(actualLocationObjKeys.locationInfo[0]).to.include.members(Object.keys(expectedUserDetailsObj_oidc.locationInfo[0]));
    }

    expect(actualLocationObjKeys.roles).to.be.an('array');

    if (configRes.data.oidcEnabled) {
      expect(actualLocationObjKeys.userInfo).to.have.all.keys(Object.keys(expectedUserDetailsObj_oidc.userInfo));
    } else {
      expect(actualLocationObjKeys.userInfo).to.have.all.keys(Object.keys(nodeAppDataModels.getUserDetails_oauth().userInfo));
    }
  });

  it('api/user/details without session', async () => {
    const response = await Request.get('api/user/details', null, 200);
    expect(Object.keys(response.data).length).to.equal(0);
  });


  it('api/configuration?configurationKey=xxx', async () => {
    await Request.withSession(userName, password);
    const response = await Request.get('api/configuration?configurationKey=termsAndConditionsEnabled', null, 200);
    console.log(response.data);

    expect(JSON.stringify(response.data)).to.have.lengthOf.below(6);
  });


});
