import {expect} from 'chai';
import { config } from './config/config';
// import * as mocha from 'mocha';
// import { mocha } from './test';
import { http } from './utils';
import { getHeaderWithCookies } from './utils/authUtil';



suite('CCD Endpoints', async () => {
    const userName = 'lukesuperuserxui@mailnesia.com';
    const password = 'Monday01';

    // const userName = 'peterxuisuperuser@mailnesia.com';
    // const password = 'Monday01';

    test('Jurisdictions for user role', async () => {
        const headerWithCookies = await getHeaderWithCookies(userName, password);
        const response = await http.get('aggregated/caseworkers/:uid/jurisdictions?access=read', headerWithCookies);
        expect(response.data).to.be.an('array');
        expect(response.data.map(e => e.name)).to.include.members(['Family Divorce', 'Public Law', 'Immigration & Asylum' , 'Manage probate application']);
    }).timeout(60000);

    test('work-basket-input for casetype', async () => {
        const jurisdictions = config.jurisdictions;
        for (const jurisdiction of jurisdictions) {
            for (const caseType of jurisdiction.caseTypeIds) {
                    const headerWithCookies = await getHeaderWithCookies(userName, password);
                    headerWithCookies.headers['experimental'] = true;
                    const response = await http.get(`data/internal/case-types/${caseType}/work-basket-inputs`, headerWithCookies);
                    expect(response.status).to.equal(200, `request with ${caseType} failed`);
                    expect(response.data).to.be.an('object');
                    expect(response.data.workbasketInputs).to.be.an('array');
            }
        }
    }).timeout(30000);

    test('Cases pagination metadata ', async () => {
        const jurisdictions = config.jurisdictions;
        for (const jurisdiction of jurisdictions) {
            for (const caseType of jurisdiction.caseTypeIds) {
                const headerWithCookies = await getHeaderWithCookies(userName, password);
                const response = await http.get(`data/caseworkers/:uid/jurisdictions/${jurisdiction.id}/case-types/${caseType}/cases/pagination_metadata?state=any`, headerWithCookies);
                expect(response.status).to.equal(200, `request with ${caseType} failed`);
                expect(response.data).to.be.an('object');
            }
        }
    }).timeout(30000);

    test('Cases ', async () => {
        const jurisdictions = config.jurisdictions;
        for (const jurisdiction of jurisdictions) {
            for (const caseType of jurisdiction.caseTypeIds) {
                const headerWithCookies = await getHeaderWithCookies(userName, password);
                const response = await http.get(`aggregated/caseworkers/:uid/jurisdictions/${jurisdiction.id}/case-types/${caseType}/cases?view=WORKBASKET&state=any&page=1`, headerWithCookies);
                expect(response.status).to.equal(200, `request with ${caseType} failed`);
                expect(response.data).to.be.an('object');
            }
        }
    }).timeout(30000);


});
