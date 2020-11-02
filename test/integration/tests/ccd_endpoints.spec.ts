import {expect} from 'chai';
// import mocha from 'mocha';
import { config } from './config/config';
import { getXSRFToken } from './utils/authUtil'
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
                const response = await Request.get(`data/caseworkers/:uid/jurisdictions/${jurisdiction.id}/case-types/${caseType}/cases/pagination_metadata`, null);
                expect(response.status).to.equal(200, `request with ${caseType} failed`);
                expect(response.data).to.be.an('object');
            });
        }
    }


    for (const jurisdiction of jurisdictions) {
        for (const caseType of jurisdiction.caseTypeIds) {
            it(`Cases for casetype  ${caseType}`, async () => {
                await Request.withSession(userName, password);
                const response = await getCasesForCaseType(jurisdiction.id, caseType);
                expect(response.status).to.equal(200, `request with ${caseType} failed`);
                expect(response.data).to.be.an('object');
                expect(response.data).to.have.property('columns');
                expect(response.data).to.have.property('results');

            });
        }
    }

    it('Case creation drafts request for probate', async  () => {
        await Request.withSession(userName, password);
        const createCaseResponse = await Request.get(getSolicitorCreateUrl('GrantOfRepresentation', 'solicitorCreateApplication'), null);

        const draftsReqBody = {
            data: {},
            event: {
                id: 'solicitorCreateApplication',
                summary: '',
                description: ''
            },
            event_token: createCaseResponse.event_token,
            ignore_warning: false
        };

        const xsrfToken = await getXSRFToken(userName, password);
        const headers = {
            experimental: true,
            'X-XSRF-TOKEN': xsrfToken
        };
        const response = await Request.post('data/case-types/GrantOfRepresentation/drafts/', draftsReqBody, headers);
        expect(response.status).to.equal(200, 'drafts url request failed GrantOfRepresentation');
    });

    it('user profile request', async () => {
        await Request.withSession(userName, password);
        const xsrfToken = await getXSRFToken(userName, password);
        const headers = {
            experimental: true,
            'X-XSRF-TOKEN': xsrfToken
        };
        const response = await Request.get('data/internal/profile', headers);
        expect(response.status).to.equal(200);
    });

    it('Get Case details', async () => {
        await Request.withSession(userName, password);
        const casesResponse = await getCasesForCaseType('DIVORCE', 'FinancialRemedyMVP2');

        console.log(casesResponse.data);
        const caseId = casesResponse.data.results[0].case_id;

        const xsrfToken = await getXSRFToken(userName, password);
        const headers = {
            experimental: true,
            'X-XSRF-TOKEN': xsrfToken
        };
        const response = await Request.get(`data/internal/cases/${caseId}`, headers);
        expect(response.status).to.equal(200);
        expect(response.data.case_id).to.equal(caseId);
        expect(response.data.case_type.id).to.equal('FinancialRemedyMVP2');
        expect(response.data).to.have.property('tabs');
        expect(response.data).to.have.property('state');
        expect(response.data).to.have.property('triggers');
        expect(response.data).to.have.property('events');
        expect(response.data).to.have.property('metadataFields');

    });

    function getSolicitorCreateUrl(caseType: string, event: string) {
        return `data/internal/case-types/${caseType}/event-triggers/${event}?ignore-warning=false`;
    }

    async function getCasesForCaseType(jurisdiction: string, casetype: string) {
        const xsrfToken = await getXSRFToken(userName, password);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken
        };
        const casesResponse = await Request.get(`aggregated/caseworkers/:uid/jurisdictions/${jurisdiction}/case-types/${casetype}/cases?view=WORKBASKET&page=1`, headers);
        return casesResponse;
    }

});
