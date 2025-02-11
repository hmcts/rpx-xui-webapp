import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EnvironmentService } from '../../shared/services/environment.service';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { HearingJuristictionConfigService } from './hearing-juristiction-config.service';

describe('HearingJuristictionConfigService', () => {
  let service: HearingJuristictionConfigService;
  let environmentServiceSpy: jasmine.SpyObj<EnvironmentService>;
  let sessionStorageServiceSpy: jasmine.SpyObj<SessionStorageService>;

  beforeEach(() => {
    const environmentSpy = jasmine.createSpyObj('EnvironmentService', ['config$']);
    const sessionStorageSpy = jasmine.createSpyObj('SessionStorageService', ['getItem']);

    TestBed.configureTestingModule({
      providers: [
        HearingJuristictionConfigService,
        { provide: EnvironmentService, useValue: environmentSpy },
        { provide: SessionStorageService, useValue: sessionStorageSpy }
      ]
    });

    service = TestBed.inject(HearingJuristictionConfigService);
    environmentServiceSpy = TestBed.inject(EnvironmentService) as jasmine.SpyObj<EnvironmentService>;
    sessionStorageServiceSpy = TestBed.inject(SessionStorageService) as jasmine.SpyObj<SessionStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct config based on user id', (done) => {
    const mockConfig = {
      '.+': [{ id: 'defaultConfig' }],
      '123': [{ id: 'userConfig' }]
    };
    const mockUserDetails = JSON.stringify({ id: '123' });

    environmentServiceSpy.config$ = of({
      hearingJuristictionConfig: mockConfig,
      idamWeb: '',
      clientId: '',
      oAuthCallback: '',
      protocol: '',
      oidcEnabled: '',
      paymentReturnUrl: '',
      headerConfig: {}
    });
    sessionStorageServiceSpy.getItem.and.returnValue(mockUserDetails);

    service.getConfig().subscribe((config) => {
      expect(config).toEqual([{ id: 'userConfig' }]);
      done();
    });
  });

  it('should return the default config if no user-specific config is found', (done) => {
    const mockConfig = {
      '.+': [{ id: 'defaultConfig' }],
      '456': [{ id: 'otherUserConfig' }]
    };
    const mockUserDetails = JSON.stringify({ id: '123' });

    environmentServiceSpy.config$ = of({
      hearingJuristictionConfig: mockConfig,
      idamWeb: '',
      clientId: '',
      oAuthCallback: '',
      protocol: '',
      oidcEnabled: '',
      paymentReturnUrl: '',
      headerConfig: {}
    });
    sessionStorageServiceSpy.getItem.and.returnValue(mockUserDetails);

    service.getConfig().subscribe((config) => {
      expect(config).toEqual([{ id: 'defaultConfig' }]);
      done();
    });
  });
});
