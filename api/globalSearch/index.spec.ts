import * as chai from 'chai';
import { expect } from 'chai';
import { NextFunction } from 'express';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock'
import * as globalSearchServices from './index';
import { http } from '../../api/lib/http';
import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import { GlobalSearchService } from '../../api/interfaces/globalSearchService';

chai.use(sinonChai);

describe('Jurisdiction', () => {

	let sandbox: sinon.SinonSandbox;
	let spy: any;
	const jurisdictionList: Jurisdiction[] = [
		{ id: 'PROBATE', name: 'Manage probate application', description: null, caseTypes: null },
		{ id: 'IA', name: 'Immigration & Asylum', description: null, caseTypes: null },
		{ id: 'PUBLICLAW', name: 'Public Law', description: null, caseTypes: null },
		{ id: 'DIVORCE', name: 'Family Divorce', description: null, caseTypes: null }
	];
	const serviceList: GlobalSearchService[] = [
		{ serviceId: 'DIVORCE', serviceName: 'Family Divorce' },
		{ serviceId: 'PROBATE', serviceName: 'Manage probate application' },
		{ serviceId: 'PUBLICLAW', serviceName: 'Public Law' }
	];

	beforeEach(() => {
		sandbox = sinon.createSandbox();
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('should get global search services', async() => {
		const req = mockReq();
		const res = mockRes({
			serviceList
		});
		const next = sinon.mock().atLeast(1) as NextFunction;
		spy = sandbox.stub(http, 'get').resolves(res);
		sandbox.stub(globalSearchServices, 'getServices').returns(res);
		const response = await globalSearchServices.getServices(req, res, next);
		expect(response).to.deep.equal(res);
	});

	it('should error when getting global search services', async() => {
		const req = mockReq();
		const res = mockRes({
			status: 500
		});
		const next = sinon.mock().atLeast(1) as NextFunction;
		sandbox.stub(globalSearchServices, 'getServices').returns(res);
		const response = await globalSearchServices.getServices(req, res, next);
		expect(response).to.deep.equal(res);
	});

	it('should return global search services', async() => {
		const services = globalSearchServices.generateServices(jurisdictionList);
		expect(services).to.deep.equal(serviceList);
	});
});
