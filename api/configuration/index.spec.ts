import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as config from 'config';
import { getConfigValue } from './index';

describe('configuration', () => {
  let sandbox: sinon.SinonSandbox;
  let originalSystemUserPassword: string | undefined;
  let originalPactBrokerPassword: string | undefined;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    originalSystemUserPassword = process.env.SYSTEM_USER_PASSWORD;
    originalPactBrokerPassword = process.env.PACT_BROKER_PASSWORD;
  });

  afterEach(() => {
    sandbox.restore();

    if (originalSystemUserPassword === undefined) {
      delete process.env.SYSTEM_USER_PASSWORD;
    } else {
      process.env.SYSTEM_USER_PASSWORD = originalSystemUserPassword;
    }

    if (originalPactBrokerPassword === undefined) {
      delete process.env.PACT_BROKER_PASSWORD;
    } else {
      process.env.PACT_BROKER_PASSWORD = originalPactBrokerPassword;
    }
  });

  it('should read the system user password directly from the environment when set', () => {
    process.env.SYSTEM_USER_PASSWORD = 'system-user-password-from-env';
    const configGetStub = sandbox.stub(config, 'get').returns('system-user-password-from-config');

    const value = getConfigValue('secrets.rpx.system-user-password');

    expect(value).to.equal('system-user-password-from-env');
    sinon.assert.notCalled(configGetStub);
  });

  it('should read the Pact broker password directly from the environment when set', () => {
    process.env.PACT_BROKER_PASSWORD = 'pact-broker-password-from-env';
    const configGetStub = sandbox.stub(config, 'get').returns('pact-broker-password-from-config');

    const value = getConfigValue('pact.brokerPassword');

    expect(value).to.equal('pact-broker-password-from-env');
    sinon.assert.notCalled(configGetStub);
  });

  it('should fall back to config for env-only password references when the environment is not set', () => {
    delete process.env.SYSTEM_USER_PASSWORD;
    const configGetStub = sandbox.stub(config, 'get').returns('system-user-password-from-config');

    const value = getConfigValue('secrets.rpx.system-user-password');

    expect(value).to.equal('system-user-password-from-config');
    sinon.assert.calledOnceWithExactly(configGetStub, 'secrets.rpx.system-user-password');
  });

  it('should continue to read normal references from config', () => {
    process.env.SYSTEM_USER_PASSWORD = 'system-user-password-from-env';
    const configGetStub = sandbox.stub(config, 'get').returns('https://idam.example.test');

    const value = getConfigValue('services.idam.idamApiUrl');

    expect(value).to.equal('https://idam.example.test');
    sinon.assert.calledOnceWithExactly(configGetStub, 'services.idam.idamApiUrl');
  });
});
