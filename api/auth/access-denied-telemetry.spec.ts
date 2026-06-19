import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { AUTH, xuiNode } from '@hmcts/rpx-xui-node-lib';
import * as appInsights from '../lib/appInsights';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest } from '../lib/models';

const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Auth access denied telemetry', () => {
  let sandbox: sinon.SinonSandbox;
  let clientStub: { trackEvent: sinon.SinonStub };
  let loggerStub: { warn: sinon.SinonStub; info: sinon.SinonStub; error: sinon.SinonStub; _logger: { info: sinon.SinonStub } };
  let xuiNodeOnStub: sinon.SinonStub;
  let accessDeniedCallback: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    clientStub = {
      trackEvent: sandbox.stub(),
    };
    loggerStub = {
      warn: sandbox.stub(),
      info: sandbox.stub(),
      error: sandbox.stub(),
      _logger: {
        info: sandbox.stub(),
      },
    };

    sandbox.stub(appInsights, 'client').value(clientStub);
    sandbox.stub(log4jui, 'getLogger').returns(loggerStub as any);
    xuiNodeOnStub = sandbox.stub(xuiNode, 'on');

    delete require.cache[require.resolve('./index')];
    accessDeniedCallback = require('./index').accessDeniedCallback;
  });

  afterEach(() => {
    sandbox.restore();
    delete require.cache[require.resolve('./index')];
  });

  it('should register the access denied telemetry listener', () => {
    expect(xuiNodeOnStub).to.have.been.calledWith(AUTH.EVENT.AUTHENTICATE_ACCESS_DENIED, accessDeniedCallback);
  });

  it('should track post-auth role denied details for users with role category', () => {
    const details = {
      allowRolesRegex: 'caseworker',
      userinfo: {
        roleCategory: 'CITIZEN',
      },
    };

    accessDeniedCallback({} as EnhancedRequest, {} as any, sandbox.stub(), details);

    expect(loggerStub.warn).to.have.been.calledWith('Post-auth role denied: user has no role matching caseworker');
    expect(clientStub.trackEvent).to.have.been.calledOnceWith({
      name: 'ManageCasePostAuthRoleDenied',
      properties: {
        isCitizen: true,
        requiredRoleMatcher: 'caseworker',
        roleCategory: 'CITIZEN',
      },
    });
  });

  it('should track post-auth role denied details for citizens without role category', () => {
    const details = {
      allowRolesRegex: 'caseworker',
      roles: ['citizen'],
    };

    accessDeniedCallback({} as EnhancedRequest, {} as any, sandbox.stub(), details);

    expect(clientStub.trackEvent).to.have.been.calledOnceWith({
      name: 'ManageCasePostAuthRoleDenied',
      properties: {
        isCitizen: true,
        requiredRoleMatcher: 'caseworker',
        roleCategory: '',
      },
    });
  });

  it('should track access denied details without role category', () => {
    const details = {
      allowRolesRegex: 'caseworker',
    };

    accessDeniedCallback({} as EnhancedRequest, {} as any, sandbox.stub(), details);

    expect(clientStub.trackEvent).to.have.been.calledOnceWith({
      name: 'ManageCasePostAuthRoleDenied',
      properties: {
        isCitizen: false,
        requiredRoleMatcher: 'caseworker',
        roleCategory: '',
      },
    });
  });

  it('should track access denied details when event details are missing', () => {
    accessDeniedCallback({} as EnhancedRequest, {} as any, sandbox.stub());

    expect(clientStub.trackEvent).to.have.been.calledOnceWith({
      name: 'ManageCasePostAuthRoleDenied',
      properties: {
        isCitizen: false,
        requiredRoleMatcher: '',
        roleCategory: '',
      },
    });
  });
});
