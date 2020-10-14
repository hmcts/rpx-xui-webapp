import {expect} from 'chai';
import { mocha } from './test';
import { http } from './utils';
import { getHeaderWithCookies } from './utils/authUtil';


suite('CCD Endpoints', () => {
    test.only('GET Manage Organisation details', async () => {
        const headerWithCookies = await getHeaderWithCookies('lukesuperuserxui@mailnesia.com', 'Monday01');
        const response = await http.get('aggregated/caseworkers/:uid/jurisdictions?access=read', headerWithCookies);
        expect(response.data).to.be.an('array');
        expect(response.data.map(e => e.name)).to.be.containingAllOf(['Family Divorce', 'Public Law', 'Immigration & Asylum' , 'Manage probate application']);
    }).timeout(30000);

});
