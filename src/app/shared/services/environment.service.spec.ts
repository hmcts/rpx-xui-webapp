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

const mockEnvironmentConfig: EnvironmentConfig = {
  idamWeb: 'https://idam.example.com',
  clientId: 'some-client-id',
  oAuthCallback: 'https://callback.example.com',
  protocol: 'http',
  oidcEnabled: 'false',
  paymentReturnUrl: 'https://payment-return.example.com',
  headerConfig: {},
  hearingJurisdictionConfig: {
    hearingJurisdictions: {},
    hearingAmendment: {},
  },
};

describe('EnvironmentService', () => {
  it('should be created', () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Window, useValue: dummyWindowAat },
        { provide: ENVIRONMENT_CONFIG, useValue: mockEnvironmentConfig },
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
        { provide: ENVIRONMENT_CONFIG, useValue: mockEnvironmentConfig },
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
        { provide: ENVIRONMENT_CONFIG, useValue: mockEnvironmentConfig },
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
        { provide: ENVIRONMENT_CONFIG, useValue: mockEnvironmentConfig },
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
        { provide: ENVIRONMENT_CONFIG, useValue: mockEnvironmentConfig },
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
        { provide: ENVIRONMENT_CONFIG, useValue: mockEnvironmentConfig },
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
        { provide: ENVIRONMENT_CONFIG, useValue: mockEnvironmentConfig },
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
        { provide: ENVIRONMENT_CONFIG, useValue: mockEnvironmentConfig },
        EnvironmentService,
      ],
    });
    const service = TestBed.inject(EnvironmentService);
    expect(service.getDeploymentEnv()).toBe(DeploymentEnvironmentEnum.LOCAL);
  });
});
