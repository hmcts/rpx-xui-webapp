import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import { handleGet } from '../../api/common/crudService';
import * as chai from 'chai';
import { expect } from 'chai';
import { NextFunction } from 'express';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock'
import * as jurisdictions from './index';
import { http } from '../../api/lib/http';

chai.use(sinonChai);

describe('Jurisdiction', () => {

    let sandbox: sinon.SinonSandbox;
    let spy: any;
    let jurisdictionList: Jurisdiction[] = [
        { id: 'PROBATE', name: 'Manage probate application', description: null, caseTypes: null },
        { id: 'IA', name: 'Immigration & Asylum', description: null, caseTypes: null },
        { id: 'PUBLICLAW', name: 'Public Law', description: null, caseTypes: null },
        { id: 'DIVORCE', name: 'Family Divorce', description: null, caseTypes: null }
    ];

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it.only('should get jurisdictions', async() => {
        const req = mockReq();
        const res = mockRes({
            jurisdictionList
        });
        const next = sinon.mock().atLeast(1) as NextFunction;
        spy = sandbox.stub(http, 'get').resolves(res);
        const response = await jurisdictions.getJurisdictions(req, res, next);
        console.log(response);
        expect(response).to.deep.equal(res);
    });
});
