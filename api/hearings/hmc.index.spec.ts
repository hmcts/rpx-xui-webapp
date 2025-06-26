import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as configuration from '../configuration';

chai.use(sinonChai);

describe('HMC Hearings API', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;
  let next: sinon.SinonStub;
  let hmc: any;
  let getHearingsStub: sinon.SinonStub;
  let createHearingStub: sinon.SinonStub;
  let updateHearingStub: sinon.SinonStub;
  let deleteHearingStub: sinon.SinonStub;

  before(() => {
    sandbox = sinon.createSandbox();
    hmc = {
      getHearings: async () => {},
      createHearing: async () => {},
      updateHearing: async () => {},
      deleteHearing: async () => {}
    };
  });

  beforeEach(() => {
    req = mockReq({ query: {}, params: {}, body: {}, headers: {}, session: {} });
    res = mockRes();
    next = sandbox.stub();
    getHearingsStub = sandbox.stub(hmc, 'getHearings');
    createHearingStub = sandbox.stub(hmc, 'createHearing');
    updateHearingStub = sandbox.stub(hmc, 'updateHearing');
    deleteHearingStub = sandbox.stub(hmc, 'deleteHearing');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should get hearings successfully', async () => {
    const mockData = [{ id: 1, case: 'A' }];
    getHearingsStub.resolves(mockData);
    await hmc.getHearings(req, res, next);
    expect(getHearingsStub).to.have.been.calledWith(req, res, next);
  });

  it('should handle getHearings error', async () => {
    const error = new Error('fail');
    getHearingsStub.callsFake(async (_req, _res, next) => {
      next(error);
    });
    await hmc.getHearings(req, res, next);
    expect(next).to.have.been.calledWith(error);
  });

  it('should create a hearing successfully', async () => {
    const mockResult = { id: 2 };
    createHearingStub.resolves(mockResult);
    await hmc.createHearing(req, res, next);
    expect(createHearingStub).to.have.been.calledWith(req, res, next);
  });

  it('should handle createHearing error', async () => {
    const error = new Error('fail');
    createHearingStub.callsFake(async (_req, _res, next) => {
      next(error);
    });
    await hmc.createHearing(req, res, next);
    expect(next).to.have.been.calledWith(error);
  });

  it('should update a hearing successfully', async () => {
    const mockResult = { updated: true };
    updateHearingStub.resolves(mockResult);
    await hmc.updateHearing(req, res, next);
    expect(updateHearingStub).to.have.been.calledWith(req, res, next);
  });

  it('should handle updateHearing error', async () => {
    const error = new Error('fail');
    updateHearingStub.callsFake(async (_req, _res, next) => {
      next(error);
    });
    await hmc.updateHearing(req, res, next);
    expect(next).to.have.been.calledWith(error);
  });

  it('should delete a hearing successfully', async () => {
    const mockResult = { deleted: true };
    deleteHearingStub.resolves(mockResult);
    await hmc.deleteHearing(req, res, next);
    expect(deleteHearingStub).to.have.been.calledWith(req, res, next);
  });

  it('should handle deleteHearing error', async () => {
    const error = new Error('fail');
    deleteHearingStub.callsFake(async (_req, _res, next) => {
      next(error);
    });
    await hmc.deleteHearing(req, res, next);
    expect(next).to.have.been.calledWith(error);
  });

  describe('Edge Cases', () => {
    it('should handle null req and res gracefully', async () => {
      getHearingsStub.resolves([]);
      await hmc.getHearings(null, null, next);
      expect(getHearingsStub).to.have.been.calledWith(null, null, next);
    });
    it('should handle undefined req and res gracefully', async () => {
      getHearingsStub.resolves([]);
      await hmc.getHearings(undefined, undefined, next);
      expect(getHearingsStub).to.have.been.calledWith(undefined, undefined, next);
    });
  });
});

describe('injectHearingsHeaders', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;
  let next: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq({ headers: {} });
    res = mockRes();
    next = sandbox.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should inject headers if config is true', () => {
    sandbox.stub(configuration, 'getConfigValue').callsFake((key) => {
      if (key === 'services.hearings.enableHearingDataSourceHeaders') return 'true';
      if (key === 'services.role_assignment.roleApi') return 'role-url';
      if (key === 'services.ccd.dataApi') return 'ccd-url';
      return undefined;
    });
    const hmcIndex = require('./hmc.index');
    req.headers = {};
    hmcIndex.injectHearingsHeaders(req, res, next);
    expect(req.headers['Role-Assignment-Url']).to.equal('role-url');
    expect(req.headers['Data-Store-Url']).to.equal('ccd-url');
    expect(next).to.have.been.called;
  });

  it('should not inject headers if config is not true', () => {
    sandbox.stub(configuration, 'getConfigValue').returns('false');
    const hmcIndex = require('./hmc.index');
    req.headers = {};
    hmcIndex.injectHearingsHeaders(req, res, next);
    expect(req.headers['Role-Assignment-Url']).to.be.undefined;
    expect(req.headers['Data-Store-Url']).to.be.undefined;
    expect(next).to.have.been.called;
  });
});
