import { TestBed } from '@angular/core/testing';
import { DecentralisedRoutingService } from './decentralised-routing.service';
import { EnvironmentService } from './environment.service';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';

describe('DecentralisedRoutingService', () => {
  let service: DecentralisedRoutingService;
  let environmentService: jasmine.SpyObj<EnvironmentService>;
  let sessionStorageService: jasmine.SpyObj<SessionStorageService>;

  beforeEach(() => {
    environmentService = jasmine.createSpyObj('EnvironmentService', ['get']);
    sessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem']);

    TestBed.configureTestingModule({
      providers: [
        DecentralisedRoutingService,
        { provide: EnvironmentService, useValue: environmentService },
        { provide: SessionStorageService, useValue: sessionStorageService }
      ]
    });

    service = TestBed.inject(DecentralisedRoutingService);
  });

  it('should return null when event is not decentralised', () => {
    environmentService.get.and.returnValue({ PCS: 'https://pcs.example' });
    const result = service.getRedirectUrlFromPathname('/cases/case-details/CIVIL/PCS/123/trigger/editCase');
    expect(result).toBeNull();
  });

  it('should return null when mapping is missing', () => {
    environmentService.get.and.returnValue({});
    const result = service.getRedirectUrlFromPathname('/cases/case-details/CIVIL/PCS/123/trigger/ext:custom');
    expect(result).toBeNull();
  });

  it('should build redirect for existing case event', () => {
    environmentService.get.and.returnValue({ PCS: 'https://pcs.example/' });
    sessionStorageService.getItem.and.returnValue(JSON.stringify({ id: 'user-123' }));

    const result = service.getRedirectUrlFromPathname(
      '/cases/case-details/CIVIL/PCS/123/trigger/ext:custom',
      { tid: 't1' }
    );

    expect(result).toBe('https://pcs.example/cases/123/event/ext%3Acustom?tid=t1&expected_sub=user-123');
  });

  it('should build redirect for case create event', () => {
    environmentService.get.and.returnValue({ PCS: 'https://pcs.example' });
    sessionStorageService.getItem.and.returnValue(JSON.stringify({ uid: 'user-456' }));

    const result = service.getRedirectUrlFromPathname(
      '/cases/case-create/JUR/PCS/ext:custom'
    );

    expect(result).toBe('https://pcs.example/cases/case-create/JUR/PCS/ext%3Acustom?expected_sub=user-456');
  });

  it('should resolve template urls for case type suffix', () => {
    environmentService.get.and.returnValue({ PCS_PR_: 'https://pcs-api-pr-%s.preview.platform' });
    sessionStorageService.getItem.and.returnValue(JSON.stringify({ id: 'user-123' }));

    const result = service.getRedirectUrlFromPathname(
      '/cases/case-details/CIVIL/PCS_PR_1234/123/trigger/ext:custom'
    );

    expect(result).toBe('https://pcs-api-pr-1234.preview.platform/cases/123/event/ext%3Acustom?expected_sub=user-123');
  });

  it('should return null when template has multiple placeholders', () => {
    environmentService.get.and.returnValue({ PCS_PR_: 'https://%s.%s.preview.platform' });

    const result = service.getRedirectUrlFromPathname(
      '/cases/case-details/CIVIL/PCS_PR_1234/123/trigger/ext:custom'
    );

    expect(result).toBeNull();
  });

  it('should return null when template suffix is missing', () => {
    environmentService.get.and.returnValue({ PCS_PR_: 'https://pcs-api-pr-%s.preview.platform' });

    const result = service.getRedirectUrlFromPathname(
      '/cases/case-details/CIVIL/PCS_PR_/123/trigger/ext:custom'
    );

    expect(result).toBeNull();
  });

  it('should return null when multiple prefixes match', () => {
    environmentService.get.and.returnValue({
      PCS: 'https://pcs.example',
      PCS_PR_: 'https://pcs-api-pr-%s.preview.platform'
    });

    const result = service.getRedirectUrlFromPathname(
      '/cases/case-details/CIVIL/PCS_PR_1234/123/trigger/ext:custom'
    );

    expect(result).toBeNull();
  });

  it('should build redirect from path array', () => {
    environmentService.get.and.returnValue({ PCS: 'https://pcs.example' });
    sessionStorageService.getItem.and.returnValue(JSON.stringify({ id: 'user-789' }));

    const result = service.getRedirectUrlFromPath(
      ['cases', 'case-details', 'IA', 'PCS', '123', 'trigger', 'ext:custom'],
      { tid: 't2' }
    );

    expect(result).toBe('https://pcs.example/cases/123/event/ext%3Acustom?tid=t2&expected_sub=user-789');
  });
});
