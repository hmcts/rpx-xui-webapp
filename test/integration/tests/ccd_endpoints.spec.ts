import {expect} from 'chai';
// import mocha from 'mocha';
import { config } from './config/config';
// import { mocha } from './test';
import Request from './utils/request';


describe('CCD Endpoints',  () => {
    const userName = 'lukesuperuserxui@mailnesia.com';
    const password = 'Monday01';

    // const userName = 'peterxuisuperuser@mailnesia.com';
    // const password = 'Monday01';
    beforeEach( () =>  {
        Request.clearSession();
    });

    // tslint:disable-next-line: only-arrow-functions
    it('Jurisdictions for user role', async function() {
        this.timeout(60000);
        await Request.withSession(userName, password);
        const response = await Request.get('aggregated/caseworkers/:uid/jurisdictions?access=read', null);
        expect(response.data).to.be.an('array');
        expect(response.data.map(e => e.name)).to.include.members(['Family Divorce', 'Public Law', 'Immigration & Asylum', 'Manage probate application']);
    });

    const jurisdictions = config.jurisdictions;
    for (const jurisdiction of jurisdictions) {
        for (const caseType of jurisdiction.caseTypeIds) {
            it(`work-basket-input for casetype  ${caseType}`, async () => {
                await Request.withSession(userName, password);
                const response = await Request.get(`data/internal/case-types/${caseType}/work-basket-inputs`, { experimental: true });
                expect(response.status).to.equal(200, `request with ${caseType} failed`);
                expect(response.data).to.be.an('object');
                expect(response.data.workbasketInputs).to.be.an('array');
            });
        }
    }


    for (const jurisdiction of jurisdictions) {
        for (const caseType of jurisdiction.caseTypeIds) {
            it(`Cases pagination metadata for casetype  ${caseType}`, async () => {
                await Request.withSession(userName, password);
                const response = await Request.get(`data/caseworkers/:uid/jurisdictions/${jurisdiction.id}/case-types/${caseType}/cases/pagination_metadata?state=any`, null);
                expect(response.status).to.equal(200, `request with ${caseType} failed`);
                expect(response.data).to.be.an('object');
            });
        }
    }


    for (const jurisdiction of jurisdictions) {
        for (const caseType of jurisdiction.caseTypeIds) {
            it(`Cases for casetype  ${caseType}`, async () => {
                await Request.withSession(userName, password);
                const response = await Request.get(`aggregated/caseworkers/:uid/jurisdictions/${jurisdiction.id}/case-types/${caseType}/cases?view=WORKBASKET&state=any&page=1`, null);
                expect(response.status).to.equal(200, `request with ${caseType} failed`);
                expect(response.data).to.be.an('object');
            });
        }
    }

});
