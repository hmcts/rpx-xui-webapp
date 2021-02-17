import { expect } from 'chai';
// import mocha from 'mocha';
import { getXSRFToken } from './utils/authUtil'
import Request from './utils/request';


describe('CCD Endpoints', () => {
    const userName = 'lukesuperuserxui@mailnesia.com';
    const password = 'Monday01';

    // const userName = 'peterxuisuperuser@mailnesia.com';
    // const password = 'Monday01';
    beforeEach(() => {
        Request.clearSession();
    });

    it('Get postcode addresswa', async () => {
        await Request.withSession(userName, password);

        const xsrfToken = await getXSRFToken(userName, password);
        const headers = {
            experimental: true,
            'X-XSRF-TOKEN': xsrfToken
        };
        const response = await Request.get('api/addresses?postcode=E1', headers, 200);
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('results');
        expect(response.data).to.have.property('header');
    });
});
