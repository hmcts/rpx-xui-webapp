
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';
import * as sinon from 'sinon';

import { idamCheck } from './idamCheck';
import * as configuration from './configuration';
import { SERVICES_IDAM_API_URL } from './configuration/references';
import { http } from './lib/http';

chai.use(sinonChai);

describe('idamCheck', () => {
  let sandbox: sinon.SinonSandbox;
  let getConfigValueStub: sinon.SinonStub;
  let httpGetStub: sinon.SinonStub;
  let consoleLogStub: sinon.SinonStub;
  let processExitStub: sinon.SinonStub;
  let resolveStub: sinon.SinonStub;
  let rejectStub: sinon.SinonStub;

  const mockIdamUrl = 'https://idam-api.test.hmcts.net';
  const mockWellKnownEndpoint = `${mockIdamUrl}/o/.well-known/openid-configuration`;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
    httpGetStub = sandbox.stub(http, 'get');
    consoleLogStub = sandbox.stub(console, 'log');
    processExitStub = sandbox.stub(process, 'exit');
    resolveStub = sandbox.stub();
    rejectStub = sandbox.stub();

    getConfigValueStub.withArgs(SERVICES_IDAM_API_URL).returns(mockIdamUrl);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('successful scenarios', () => {
    it('should resolve when IDAM API returns valid response', async () => {
      const mockResponse = {
        issuer: 'https://idam-api.test.hmcts.net/o',
        authorization_endpoint: 'https://idam-api.test.hmcts.net/o/authorize',
        token_endpoint: 'https://idam-api.test.hmcts.net/o/token'
      };
      httpGetStub.resolves(mockResponse);

      await idamCheck(resolveStub, rejectStub);

      expect(getConfigValueStub).to.have.been.calledOnceWith(SERVICES_IDAM_API_URL);
      expect(httpGetStub).to.have.been.calledOnceWith(mockWellKnownEndpoint);
      expect(resolveStub).to.have.been.calledOnce;
      expect(rejectStub).not.to.have.been.called;
      expect(consoleLogStub).not.to.have.been.called;
      expect(processExitStub).not.to.have.been.called;
    });

    it('should resolve when IDAM API returns string response', async () => {
      const mockResponse = 'some response';
      httpGetStub.resolves(mockResponse);

      await idamCheck(resolveStub, rejectStub);

      expect(getConfigValueStub).to.have.been.calledOnceWith(SERVICES_IDAM_API_URL);
      expect(httpGetStub).to.have.been.calledOnceWith(mockWellKnownEndpoint);
      expect(resolveStub).to.have.been.calledOnce;
      expect(rejectStub).not.to.have.been.called;
      expect(consoleLogStub).not.to.have.been.called;
      expect(processExitStub).not.to.have.been.called;
    });
  });

  describe('failure scenarios - falsy response', () => {
    it('should exit process when IDAM API returns null', async () => {
      httpGetStub.resolves(null);

      await idamCheck(resolveStub, rejectStub);
      expect(getConfigValueStub).to.have.been.calledOnceWith(SERVICES_IDAM_API_URL);
      expect(httpGetStub).to.have.been.calledOnceWith(mockWellKnownEndpoint);
      expect(consoleLogStub).to.have.been.calledOnceWith('idam api must be up to start');
      expect(processExitStub).to.have.been.calledOnceWith(1);
      // Note: In tests, process.exit is stubbed so execution continues and resolve() is called
      expect(resolveStub).to.have.been.calledOnce;
      expect(rejectStub).not.to.have.been.called;
    });

    it('should exit process when IDAM API returns undefined', async () => {
      httpGetStub.resolves(undefined);

      await idamCheck(resolveStub, rejectStub);
      expect(getConfigValueStub).to.have.been.calledOnceWith(SERVICES_IDAM_API_URL);
      expect(httpGetStub).to.have.been.calledOnceWith(mockWellKnownEndpoint);
      expect(consoleLogStub).to.have.been.calledOnceWith('idam api must be up to start');
      expect(processExitStub).to.have.been.calledOnceWith(1);
      expect(resolveStub).to.have.been.calledOnce;
      expect(rejectStub).not.to.have.been.called;
    });

    it('should exit process when IDAM API returns false', async () => {
      httpGetStub.resolves(false);

      await idamCheck(resolveStub, rejectStub);
      expect(getConfigValueStub).to.have.been.calledOnceWith(SERVICES_IDAM_API_URL);
      expect(httpGetStub).to.have.been.calledOnceWith(mockWellKnownEndpoint);
      expect(consoleLogStub).to.have.been.calledOnceWith('idam api must be up to start');
      expect(processExitStub).to.have.been.calledOnceWith(1);
      expect(resolveStub).to.have.been.calledOnce;
      expect(rejectStub).not.to.have.been.called;
    });

    it('should exit process when IDAM API returns empty string', async () => {
      httpGetStub.resolves('');

      await idamCheck(resolveStub, rejectStub);
      expect(getConfigValueStub).to.have.been.calledOnceWith(SERVICES_IDAM_API_URL);
      expect(httpGetStub).to.have.been.calledOnceWith(mockWellKnownEndpoint);
      expect(consoleLogStub).to.have.been.calledOnceWith('idam api must be up to start');
      expect(processExitStub).to.have.been.calledOnceWith(1);
      expect(resolveStub).to.have.been.calledOnce;
      expect(rejectStub).not.to.have.been.called;
    });
  });

  describe('error scenarios', () => {
    it('should handle HTTP request errors (network failure)', async () => {
      const networkError = new Error('Network Error');
      httpGetStub.rejects(networkError);

      await idamCheck(resolveStub, rejectStub);
      expect(getConfigValueStub).to.have.been.calledOnceWith(SERVICES_IDAM_API_URL);
      expect(httpGetStub).to.have.been.calledOnceWith(mockWellKnownEndpoint);
      expect(consoleLogStub).to.have.been.calledOnceWith('idam api must be up to start');
      expect(processExitStub).to.have.been.calledOnceWith(1);
      // Note: In tests, both reject(err) in catch block AND resolve() at end are called
      expect(rejectStub).to.have.been.calledOnceWith(networkError);
      expect(resolveStub).to.have.been.calledOnce;
    });

    it('should handle HTTP 404 errors', async () => {
      const httpError = new Error('Request failed with status code 404');
      httpError.name = 'AxiosError';
      httpGetStub.rejects(httpError);

      await idamCheck(resolveStub, rejectStub);
      expect(getConfigValueStub).to.have.been.calledOnceWith(SERVICES_IDAM_API_URL);
      expect(httpGetStub).to.have.been.calledOnceWith(mockWellKnownEndpoint);
      expect(consoleLogStub).to.have.been.calledOnceWith('idam api must be up to start');
      expect(processExitStub).to.have.been.calledOnceWith(1);
      expect(rejectStub).to.have.been.calledOnceWith(httpError);
      expect(resolveStub).to.have.been.calledOnce;
    });

    it('should handle HTTP 500 errors', async () => {
      const serverError = new Error('Request failed with status code 500');
      serverError.name = 'AxiosError';
      httpGetStub.rejects(serverError);

      await idamCheck(resolveStub, rejectStub);
      expect(getConfigValueStub).to.have.been.calledOnceWith(SERVICES_IDAM_API_URL);
      expect(httpGetStub).to.have.been.calledOnceWith(mockWellKnownEndpoint);
      expect(consoleLogStub).to.have.been.calledOnceWith('idam api must be up to start');
      expect(processExitStub).to.have.been.calledOnceWith(1);
      expect(rejectStub).to.have.been.calledOnceWith(serverError);
      expect(resolveStub).to.have.been.calledOnce;
    });

    it('should handle timeout errors', async () => {
      const timeoutError = new Error('timeout of 30000ms exceeded');
      timeoutError.name = 'AxiosError';
      httpGetStub.rejects(timeoutError);

      await idamCheck(resolveStub, rejectStub);
      expect(getConfigValueStub).to.have.been.calledOnceWith(SERVICES_IDAM_API_URL);
      expect(httpGetStub).to.have.been.calledOnceWith(mockWellKnownEndpoint);
      expect(consoleLogStub).to.have.been.calledOnceWith('idam api must be up to start');
      expect(processExitStub).to.have.been.calledOnceWith(1);
      expect(rejectStub).to.have.been.calledOnceWith(timeoutError);
      expect(resolveStub).to.have.been.calledOnce;
    });

    it('should handle configuration errors (missing IDAM URL)', async () => {
      getConfigValueStub.withArgs(SERVICES_IDAM_API_URL).returns(undefined);
      const configError = new Error('IDAM URL not configured');
      httpGetStub.rejects(configError);

      await idamCheck(resolveStub, rejectStub);
      expect(getConfigValueStub).to.have.been.calledOnceWith(SERVICES_IDAM_API_URL);
      expect(httpGetStub).to.have.been.calledOnceWith('undefined/o/.well-known/openid-configuration');
      expect(consoleLogStub).to.have.been.calledOnceWith('idam api must be up to start');
      expect(processExitStub).to.have.been.calledOnceWith(1);
      expect(rejectStub).to.have.been.calledOnceWith(configError);
      expect(resolveStub).to.have.been.calledOnce;
    });

    it('should handle unexpected thrown objects (non-Error)', async () => {
      const thrownString = 'Unexpected string error';
      httpGetStub.rejects(thrownString);

      await idamCheck(resolveStub, rejectStub);
      expect(getConfigValueStub).to.have.been.calledOnceWith(SERVICES_IDAM_API_URL);
      expect(httpGetStub).to.have.been.calledOnceWith(mockWellKnownEndpoint);
      expect(consoleLogStub).to.have.been.calledOnceWith('idam api must be up to start');
      expect(processExitStub).to.have.been.calledOnceWith(1);

      // Verify that both reject and resolve are called (due to stubbed process.exit)
      // Note: We don't check the exact error value due to potential type conversion issues
      expect(rejectStub).to.have.been.calledOnce;
      expect(resolveStub).to.have.been.calledOnce;
    });
  });

  describe('edge cases and boundary conditions', () => {
    it('should handle empty IDAM URL from configuration', async () => {
      getConfigValueStub.withArgs(SERVICES_IDAM_API_URL).returns('');
      const mockResponse = { issuer: 'test' };
      httpGetStub.resolves(mockResponse);

      await idamCheck(resolveStub, rejectStub);

      expect(getConfigValueStub).to.have.been.calledOnceWith(SERVICES_IDAM_API_URL);
      expect(httpGetStub).to.have.been.calledOnceWith('/o/.well-known/openid-configuration');
      expect(resolveStub).to.have.been.calledOnce;
      expect(rejectStub).not.to.have.been.called;
      expect(consoleLogStub).not.to.have.been.called;
      expect(processExitStub).not.to.have.been.called;
    });

    it('should handle IDAM URL with trailing slash', async () => {
      const idamUrlWithSlash = 'https://idam-api.test.hmcts.net/';
      getConfigValueStub.withArgs(SERVICES_IDAM_API_URL).returns(idamUrlWithSlash);
      const mockResponse = { issuer: 'test' };
      httpGetStub.resolves(mockResponse);

      await idamCheck(resolveStub, rejectStub);

      expect(getConfigValueStub).to.have.been.calledOnceWith(SERVICES_IDAM_API_URL);
      expect(httpGetStub).to.have.been.calledOnceWith(`${idamUrlWithSlash}/o/.well-known/openid-configuration`);
      expect(resolveStub).to.have.been.calledOnce;
      expect(rejectStub).not.to.have.been.called;
      expect(consoleLogStub).not.to.have.been.called;
      expect(processExitStub).not.to.have.been.called;
    });
  });

  describe('function signature and callback behavior', () => {
    it('should call resolve without arguments when successful', async () => {
      const mockResponse = { issuer: 'test' };
      httpGetStub.resolves(mockResponse);

      await idamCheck(resolveStub, rejectStub);
      expect(resolveStub).to.have.been.calledOnceWithExactly();
    });

    it('should call reject with error when HTTP call fails', async () => {
      const testError = new Error('Test error');
      httpGetStub.rejects(testError);

      await idamCheck(resolveStub, rejectStub);
      // Note: In tests, both reject(err) in catch block AND resolve() at end are called
      expect(rejectStub).to.have.been.calledOnceWith(testError);
      expect(processExitStub).to.have.been.calledOnceWith(1);
      expect(resolveStub).to.have.been.calledOnce;
    });

    it('should handle null resolve callback gracefully', async () => {
      const mockResponse = { issuer: 'test' };
      httpGetStub.resolves(mockResponse);

      // Act & Assert - should throw when trying to call null as a function
      try {
        await idamCheck(null, rejectStub);
        expect.fail('Should have thrown an error when resolve is null');
      } catch (error) {
        expect(error.message).to.contain('resolve is not a function');
      }
      expect(consoleLogStub).not.to.have.been.called;
      expect(processExitStub).not.to.have.been.called;
    });

    it('should handle null reject callback gracefully', async () => {
      const testError = new Error('Test error');
      httpGetStub.rejects(testError);

      // Act & Assert - should throw when trying to call null as a function
      try {
        await idamCheck(resolveStub, null);
        expect.fail('Should have thrown an error when reject is null');
      } catch (error) {
        expect(error.message).to.contain('reject is not a function');
      }
      expect(consoleLogStub).to.have.been.calledOnceWith('idam api must be up to start');
      expect(processExitStub).to.have.been.calledOnceWith(1);
    });
  });
});
