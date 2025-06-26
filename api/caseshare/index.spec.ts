import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as configuration from '../configuration';
import * as realAPI from './real-api';
import * as stubAPI from './stub-api';

chai.use(sinonChai);

describe('Case Share Index', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;
  let next: sinon.SinonStub;
  let getConfigValueStub: sinon.SinonStub;
  let realAPIGetUsersStub: sinon.SinonStub;
  let realAPIGetCasesStub: sinon.SinonStub;
  let realAPIAssignCasesStub: sinon.SinonStub;
  let stubAPIGetUsersStub: sinon.SinonStub;
  let stubAPIGetCasesStub: sinon.SinonStub;
  let stubAPIAssignCasesStub: sinon.SinonStub;
  let getUsers: any;
  let getCases: any;
  let assignCasesToUsers: any;

  before(() => {
    // Clear the module cache to ensure fresh import
    delete require.cache[require.resolve('./index')];
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq({});
    res = mockRes();
    next = sandbox.stub();
    
    // Stub the API methods
    realAPIGetUsersStub = sandbox.stub(realAPI, 'getUsers');
    realAPIGetCasesStub = sandbox.stub(realAPI, 'getCases');
    realAPIAssignCasesStub = sandbox.stub(realAPI, 'assignCases');
    stubAPIGetUsersStub = sandbox.stub(stubAPI, 'getUsers');
    stubAPIGetCasesStub = sandbox.stub(stubAPI, 'getCases');
    stubAPIAssignCasesStub = sandbox.stub(stubAPI, 'assignCases');
  });

  afterEach(() => {
    sandbox.restore();
  });

  after(() => {
    // Clear the module cache
    delete require.cache[require.resolve('./index')];
  });

  describe('when stub is true', () => {
    beforeEach(() => {
      // Set up stub configuration before importing
      getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
      getConfigValueStub.returns(true);
      
      // Clear and re-require the module to pick up the stubbed config
      delete require.cache[require.resolve('./index')];
      const index = require('./index');
      getUsers = index.getUsers;
      getCases = index.getCases;
      assignCasesToUsers = index.assignCasesToUsers;
    });

    describe('getUsers', () => {
      it('should call stubAPI.getUsers when stub is true', async () => {
        await getUsers(req, res, next);

        expect(stubAPIGetUsersStub).to.have.been.calledOnceWith(req, res);
        expect(realAPIGetUsersStub).to.not.have.been.called;
      });
    });

    describe('getCases', () => {
      it('should call stubAPI.getCases when stub is true', async () => {
        await getCases(req, res, next);

        expect(stubAPIGetCasesStub).to.have.been.calledOnceWith(req, res);
        expect(realAPIGetCasesStub).to.not.have.been.called;
      });
    });

    describe('assignCasesToUsers', () => {
      it('should call stubAPI.assignCases when stub is true', async () => {
        await assignCasesToUsers(req, res);

        expect(stubAPIAssignCasesStub).to.have.been.calledOnceWith(req, res);
        expect(realAPIAssignCasesStub).to.not.have.been.called;
      });
    });
  });

  describe('when stub is false', () => {
    beforeEach(() => {
      // Set up stub configuration before importing
      getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
      getConfigValueStub.returns(false);
      
      // Clear and re-require the module to pick up the stubbed config
      delete require.cache[require.resolve('./index')];
      const index = require('./index');
      getUsers = index.getUsers;
      getCases = index.getCases;
      assignCasesToUsers = index.assignCasesToUsers;
    });

    describe('getUsers', () => {
      it('should call realAPI.getUsers when stub is false', async () => {
        await getUsers(req, res, next);

        expect(realAPIGetUsersStub).to.have.been.calledOnceWith(req, res, next);
        expect(stubAPIGetUsersStub).to.not.have.been.called;
      });
    });

    describe('getCases', () => {
      it('should call realAPI.getCases when stub is false', async () => {
        await getCases(req, res, next);

        expect(realAPIGetCasesStub).to.have.been.calledOnceWith(req, res, next);
        expect(stubAPIGetCasesStub).to.not.have.been.called;
      });
    });

    describe('assignCasesToUsers', () => {
      it('should call realAPI.assignCases when stub is false', async () => {
        await assignCasesToUsers(req, res);

        expect(realAPIAssignCasesStub).to.have.been.calledOnceWith(req, res);
        expect(stubAPIAssignCasesStub).to.not.have.been.called;
      });
    });
  });
});