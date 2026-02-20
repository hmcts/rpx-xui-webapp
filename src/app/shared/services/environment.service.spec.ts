import { TestBed } from '@angular/core/testing';
import { EnvironmentService } from './environment.service';
import { DeploymentEnvironmentEnum } from '../../enums/deployment-environment-enum';
import { ENVIRONMENT_CONFIG, EnvironmentConfig } from '../../../models/environmentConfig.model';

/*
  PROD = 'prod',
  AAT = 'aat',
  DEMO = 'demo',
  PERFTEST = 'perftest',
  ITHC = 'ithc',
  PREVIEW = 'preview',
  LOCAL = 'local'
*/
const dummyWindowProd = { location: new URL('https://manage-case.platform.hmcts.net') };
const dummyWindowAat = { location: new URL('https://manage-case.aat.platform.hmcts.net') };
const dummyWindowDemo = { location: new URL('https://manage-case.demo.platform.hmcts.net') };
const dummyWindowPerftest = { location: new URL('https://manage-case.perftest.platform.hmcts.net') };
const dummyWindowIthc = { location: new URL('https://manage-case.ithc.platform.hmcts.net') };
const dummyWindowPreview = { location: new URL('https://pr-666.preview.platform.hmcts.net') };
const dummyWindowLocalhost = { location: new URL('http://localhost:3000') };
const dummyEnvConfig: EnvironmentConfig = {
  idamWeb: 'https://idam-web',
  ccdGatewayUrl: 'https://ccd-gateway',
  clientId: 'xui-client',
  oAuthCallback: '/oauth2/callback',
  protocol: 'oauth2',
  oidcEnabled: 'true',
  launchDarklyClientId: 'ld-client',
  paymentReturnUrl: '/payment-return',
  headerConfig: {
    '.+': [],
  },
  hearingJurisdictionConfig: {
    hearingJurisdictions: {},
    hearingAmendment: {},
  },
};

describe('EnvironmentService', () => {
  it('config$ should emit the injected ENVIRONMENT_CONFIG value', (done: DoneFn) => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Window, useValue: dummyWindowAat },
        { provide: ENVIRONMENT_CONFIG, useValue: dummyEnvConfig },
        EnvironmentService,
      ],
    });
    const service = TestBed.inject(EnvironmentService);
    service.config$.subscribe((config) => {
      expect(config).toEqual(dummyEnvConfig);
      done();
    });
  });

  it('config$ should complete without emitting when ENVIRONMENT_CONFIG is missing', () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: Window, useValue: dummyWindowAat }, EnvironmentService],
    });
    const service = TestBed.inject(EnvironmentService);
    const nextSpy = jasmine.createSpy('next');
    const completeSpy = jasmine.createSpy('complete');

    service.config$.subscribe({
      next: nextSpy,
      complete: completeSpy,
    });

    expect(nextSpy).not.toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalledTimes(1);
  });

  it('get(...) should return null when ENVIRONMENT_CONFIG is missing', () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: Window, useValue: dummyWindowAat }, EnvironmentService],
    });
    const service = TestBed.inject(EnvironmentService);
    expect(service.get('clientId')).toBeNull();
  });

  it('should read values from ENVIRONMENT_CONFIG', () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Window, useValue: dummyWindowAat },
        { provide: ENVIRONMENT_CONFIG, useValue: dummyEnvConfig },
        EnvironmentService,
      ],
    });
    const service = TestBed.inject(EnvironmentService);
    expect(service.get('clientId')).toBe('xui-client');
    expect(service.get('launchDarklyClientId')).toBe('ld-client');
  });

  it('should be created', () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Window, useValue: dummyWindowAat },
        EnvironmentService,
      ],
    });
    const service = TestBed.inject(EnvironmentService);
    expect(service).toBeTruthy();
  });

  it('should detect the prod environment correctly', () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Window, useValue: dummyWindowProd },
        EnvironmentService,
      ],
    });
    const service = TestBed.inject(EnvironmentService);
    expect(service.getDeploymentEnv()).toBe(DeploymentEnvironmentEnum.PROD);
  });

  it('should detect the aat environment correctly', () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Window, useValue: dummyWindowAat },
        EnvironmentService,
      ],
    });
    const service = TestBed.inject(EnvironmentService);
    expect(service.getDeploymentEnv()).toBe(DeploymentEnvironmentEnum.AAT);
  });

  it('should detect the demo environment correctly', () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Window, useValue: dummyWindowDemo },
        EnvironmentService,
      ],
    });
    const service = TestBed.inject(EnvironmentService);
    expect(service.getDeploymentEnv()).toBe(DeploymentEnvironmentEnum.DEMO);
  });

  it('should detect the perftest environment correctly', () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Window, useValue: dummyWindowPerftest },
        EnvironmentService,
      ],
    });
    const service = TestBed.inject(EnvironmentService);
    expect(service.getDeploymentEnv()).toBe(DeploymentEnvironmentEnum.PERFTEST);
  });

  it('should detect the ithc environment correctly', () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Window, useValue: dummyWindowIthc },
        EnvironmentService,
      ],
    });
    const service = TestBed.inject(EnvironmentService);
    expect(service.getDeploymentEnv()).toBe(DeploymentEnvironmentEnum.ITHC);
  });

  it('should detect the preview environment correctly', () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Window, useValue: dummyWindowPreview },
        EnvironmentService,
      ],
    });
    const service = TestBed.inject(EnvironmentService);
    expect(service.getDeploymentEnv()).toBe(DeploymentEnvironmentEnum.PREVIEW);
  });

  it('should detect the local environment correctly', () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Window, useValue: dummyWindowLocalhost },
        EnvironmentService,
      ],
    });
    const service = TestBed.inject(EnvironmentService);
    expect(service.getDeploymentEnv()).toBe(DeploymentEnvironmentEnum.LOCAL);
  });
});
