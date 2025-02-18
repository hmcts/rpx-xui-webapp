import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EnvironmentService } from '../../shared/services/environment.service';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { HearingJurisdictionConfigService } from './hearing-jurisdiction-config.service';

describe('HearingJurisdictionConfigService', () => {
  let service: HearingJurisdictionConfigService;
  let environmentServiceSpy: jasmine.SpyObj<EnvironmentService>;
  let sessionStorageServiceSpy: jasmine.SpyObj<SessionStorageService>;

  beforeEach(() => {
    const environmentSpy = jasmine.createSpyObj('EnvironmentService', ['config$']);
    const sessionStorageSpy = jasmine.createSpyObj('SessionStorageService', ['getItem']);

    TestBed.configureTestingModule({
      providers: [
        HearingJurisdictionConfigService,
        { provide: EnvironmentService, useValue: environmentSpy },
        { provide: SessionStorageService, useValue: sessionStorageSpy }
      ]
    });

    service = TestBed.inject(HearingJurisdictionConfigService);
    environmentServiceSpy = TestBed.inject(EnvironmentService) as jasmine.SpyObj<EnvironmentService>;
    sessionStorageServiceSpy = TestBed.inject(SessionStorageService) as jasmine.SpyObj<SessionStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct config based on user id', (done) => {
    const mockConfig = {
      '.+': [{ jurisdiction: 'defaultConfig' }],
      '123': [{ jurisdiction: 'userConfig' }]
    };
    const mockUserDetails = JSON.stringify({ jurisdiction: '123' });

    environmentServiceSpy.config$ = of({
      hearingJurisdictionConfig: {
        hearingJurisdictions: mockConfig,
        hearingAmendment: {}
      },
      idamWeb: '',
      clientId: '',
      oAuthCallback: '',
      protocol: '',
      oidcEnabled: '',
      paymentReturnUrl: '',
      headerConfig: {}
    });
    sessionStorageServiceSpy.getItem.and.returnValue(mockUserDetails);

    service.getHearingJurisdictionsConfig().subscribe((config) => {
      expect(config).toEqual([{ jurisdiction: 'userConfig' }]);
      done();
    });
  });

  it('should return the default config if no user-specific config is found', (done) => {
    const mockConfig = {
      '.+': [{ jurisdiction: 'defaultConfig' }],
      '456': [{ jurisdiction: 'otherUserConfig' }]
    };
    const mockUserDetails = JSON.stringify({ jurisdiction: '123' });

    environmentServiceSpy.config$ = of({
      hearingJurisdictionConfig: {
        hearingJurisdictions: mockConfig,
        hearingAmendment: {}
      },
      idamWeb: '',
      clientId: '',
      oAuthCallback: '',
      protocol: '',
      oidcEnabled: '',
      paymentReturnUrl: '',
      headerConfig: {}
    });
    sessionStorageServiceSpy.getItem.and.returnValue(mockUserDetails);

    service.getHearingJurisdictionsConfig().subscribe((config) => {
      expect(config).toEqual([{ jurisdiction: 'defaultConfig' }]);
      done();
    });
  });
});
