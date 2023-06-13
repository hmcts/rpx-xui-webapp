import { expect } from 'chai';
// import mocha from 'mocha';
import { getXSRFToken } from './utils/authUtil';
import { setTestContext } from './utils/helper';
import Request from './utils/request';
const config = require('./config/config').config;


describe('CCD Endpoints', () => {
    const userName = config.users[config.testEnv].solicitor.e;
    const password = config.users[config.testEnv].solicitor.sec;

    // const userName = 'peterxuisuperuser@mailnesia.com';
    // const password = 'Monday01';
    beforeEach(function ()  {
        this.timeout(120000);

        setTestContext(this);
        Request.clearSession();
    });

    it('Get postcode addresswa', async () => {
        await Request.withSession(userName, password);

        const xsrfToken = await getXSRFToken(userName, password);
        const headers = {
            // experimental: true,
            'X-XSRF-TOKEN': xsrfToken
        };
        const response = await Request.get('api/addresses?postcode=E1', headers, 200);
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('results');
        expect(response.data).to.have.property('header');
    });
});
