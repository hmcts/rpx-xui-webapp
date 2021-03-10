import { expect } from 'chai';
import { v4 as uuid } from 'uuid';
// import mocha from 'mocha';
import { config } from './config/config';
import { getUserId, getXSRFToken } from './utils/authUtil';
import Request from './utils/request';



describe('Case share ', () => {
    const userName = 'lukesuperuserxui@mailnesia.com';
    const password = 'Monday01';

    // const userName = 'peterxuisuperuser@mailnesia.com';
    // const password = 'Monday01';
    beforeEach(() => {
        Request.clearSession();
    });

    // tslint:disable-next-line: only-arrow-functions
    it('Get organisations', async function () {
        this.timeout(60000);
        await Request.withSession(userName, password);
        const xsrfToken = await getXSRFToken(userName, password);
        const headers = {
            experimental: true,
            'X-XSRF-TOKEN': xsrfToken
        };
        const response = await Request.get(`caseshare/orgs`, headers, 200);
        expect(response.status).to.equal(200);
    });

    it('Get organisation users', async function () {
        this.timeout(60000);
        await Request.withSession(userName, password);
        const xsrfToken = await getXSRFToken(userName, password);
        const headers = {
            experimental: true,
            'X-XSRF-TOKEN': xsrfToken
        };
        const response = await Request.get(`caseshare/users`, headers, 200);
        expect(response.status).to.equal(200);
    });

    it('Get cases', async function () {
        this.timeout(60000);
        await Request.withSession(userName, password);
        const xsrfToken = await getXSRFToken(userName, password);
        const headers = {
            experimental: true,
            'X-XSRF-TOKEN': xsrfToken
        };
        const response = await Request.get(`caseshare/cases`, headers, 200);
        expect(response.status).to.equal(200);
    });

    it('Get assignments', async function () {
        this.timeout(60000);
        await Request.withSession(userName, password);
        const xsrfToken = await getXSRFToken(userName, password);
        const headers = {
            experimental: true,
            'X-XSRF-TOKEN': xsrfToken
        };
        const response = await Request.get(`caseshare/case-assignments`, headers, 200);
        expect(response.status).to.equal(200);
    });

});
