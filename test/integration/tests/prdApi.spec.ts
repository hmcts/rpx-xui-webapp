import { expect } from 'chai';
// import mocha from 'mocha';
import { config } from './config/config';
import { getXSRFToken } from './utils/authUtil';
import { setTestContext } from './utils/helper';
import Request from './utils/request';



describe('Case share ', () => {
    const userName = config.users[config.testEnv].solicitor.e;
    const password = config.users[config.testEnv].solicitor.sec;

    beforeEach(function () {
        this.timeout(120000);

        setTestContext(this);
        Request.clearSession();
    });

    // tslint:disable-next-line: only-arrow-functions
    it('Get organisations', async function () {
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
