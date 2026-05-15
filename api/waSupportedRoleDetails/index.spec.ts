import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';

chai.use(sinonChai);

describe('WA Supported Role Details', () => {
  let sandbox: sinon.SinonSandbox;
  let req;
  let res;
  let next: sinon.SinonStub;
  let getConfigValueStub: sinon.SinonStub;
  let waSupportedRoleDetails;

  beforeEach(() => {
    delete require.cache[require.resolve('./index')];
    delete require.cache[require.resolve('../configuration')];
    delete require.cache[require.resolve('../configuration/references')];

    sandbox = sinon.createSandbox();
    const config = require('../configuration');
    getConfigValueStub = sandbox.stub(config, 'getConfigValue');
    getConfigValueStub.withArgs('waSupportedRoleCategories').returns('LEGAL_OPERATIONS,ADMIN,CTSC,JUDICIAL');
    getConfigValueStub.withArgs('waSupportedRoleTypes').returns('ORGANISATION,CASE');

    waSupportedRoleDetails = require('./index');
    req = mockReq({});
    res = mockRes();
    next = sandbox.stub();

    res.send.returns(res);
    res.status.returns(res);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getWASupportedRoleCategoriesList', () => {
    it('should return configured supported role categories', async () => {
      await waSupportedRoleDetails.getWASupportedRoleCategoriesList(req, res, next);

      expect(res.send).to.have.been.calledWith(['LEGAL_OPERATIONS', 'ADMIN', 'CTSC', 'JUDICIAL']);
      expect(res.status).to.have.been.calledWith(200);
      expect(next).not.to.have.been.called;
    });

    it('should pass configuration errors to next', async () => {
      const error = new Error('Config Error');
      getConfigValueStub.withArgs('waSupportedRoleCategories').throws(error);

      await waSupportedRoleDetails.getWASupportedRoleCategoriesList(req, res, next);

      expect(res.send).not.to.have.been.called;
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getWASupportedRoleTypesList', () => {
    it('should return configured supported role types', async () => {
      await waSupportedRoleDetails.getWASupportedRoleTypesList(req, res, next);

      expect(res.send).to.have.been.calledWith(['ORGANISATION', 'CASE']);
      expect(res.status).to.have.been.calledWith(200);
      expect(next).not.to.have.been.called;
    });

    it('should pass configuration errors to next', async () => {
      const error = new Error('Config Error');
      getConfigValueStub.withArgs('waSupportedRoleTypes').throws(error);

      await waSupportedRoleDetails.getWASupportedRoleTypesList(req, res, next);

      expect(res.send).not.to.have.been.called;
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('router', () => {
    it('should register role detail routes', () => {
      const routes = waSupportedRoleDetails.router.stack.filter((layer) => layer.route).map((layer) => layer.route.path);

      expect(routes).to.deep.equal(['/getRoleCategories', '/getRoleTypes']);
      expect(waSupportedRoleDetails.default).to.equal(waSupportedRoleDetails.router);
    });
  });
});
