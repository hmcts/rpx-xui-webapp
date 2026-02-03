import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
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

  function buildSnapshot(paramsByLevel: Array<Record<string, string>>, queryParams: Record<string, string> = {}): ActivatedRouteSnapshot {
    const build = (index: number): ActivatedRouteSnapshot => {
      return {
        params: paramsByLevel[index],
        queryParams,
        children: index < paramsByLevel.length - 1 ? [build(index + 1)] : []
      } as ActivatedRouteSnapshot;
    };
    return build(0);
  }

  it('should return null when event is not decentralised', () => {
    environmentService.get.and.returnValue({ PCS: 'https://pcs.example' });
    const route = buildSnapshot([
      { jurisdiction: 'CIVIL', caseType: 'PCS', cid: '123' },
      { eid: 'editCase' }
    ]);
    const result = service.getRedirectUrlFromRoute(route);
    expect(result).toBeNull();
  });

  it('should return null when mapping is missing', () => {
    environmentService.get.and.returnValue({});
    const route = buildSnapshot([
      { jurisdiction: 'CIVIL', caseType: 'PCS', cid: '123' },
      { eid: 'ext:custom' }
    ]);
    const result = service.getRedirectUrlFromRoute(route);
    expect(result).toBeNull();
  });

  it('should build redirect for existing case event', () => {
    environmentService.get.and.returnValue({ PCS: 'https://pcs.example/' });
    sessionStorageService.getItem.and.returnValue(JSON.stringify({ id: 'user-123' }));

    const route = buildSnapshot([
      { jurisdiction: 'CIVIL', caseType: 'PCS', cid: '123' },
      { eid: 'ext:custom' }
    ], { tid: 't1' });
    const result = service.getRedirectUrlFromRoute(route);

    expect(result).toBe('https://pcs.example/cases/123/event/ext%3Acustom?tid=t1&expected_sub=user-123');
  });

  it('should build redirect for case create event', () => {
    environmentService.get.and.returnValue({ PCS: 'https://pcs.example' });
    sessionStorageService.getItem.and.returnValue(JSON.stringify({ uid: 'user-456' }));

    const route = buildSnapshot([
      { jid: 'JUR', ctid: 'PCS', eid: 'ext:custom' }
    ]);
    const result = service.getRedirectUrlFromRoute(route);

    expect(result).toBe('https://pcs.example/cases/case-create/JUR/PCS/ext%3Acustom?expected_sub=user-456');
  });

  it('should resolve template urls for case type suffix', () => {
    environmentService.get.and.returnValue({ PCS_PR_: 'https://pcs-api-pr-%s.preview.platform' });
    sessionStorageService.getItem.and.returnValue(JSON.stringify({ id: 'user-123' }));

    const route = buildSnapshot([
      { jurisdiction: 'CIVIL', caseType: 'PCS_PR_1234', cid: '123' },
      { eid: 'ext:custom' }
    ]);
    const result = service.getRedirectUrlFromRoute(route);

    expect(result).toBe('https://pcs-api-pr-1234.preview.platform/cases/123/event/ext%3Acustom?expected_sub=user-123');
  });

  it('should return null when template has multiple placeholders', () => {
    environmentService.get.and.returnValue({ PCS_PR_: 'https://%s.%s.preview.platform' });

    const route = buildSnapshot([
      { jurisdiction: 'CIVIL', caseType: 'PCS_PR_1234', cid: '123' },
      { eid: 'ext:custom' }
    ]);
    const result = service.getRedirectUrlFromRoute(route);

    expect(result).toBeNull();
  });

  it('should return null when template suffix is missing', () => {
    environmentService.get.and.returnValue({ PCS_PR_: 'https://pcs-api-pr-%s.preview.platform' });

    const route = buildSnapshot([
      { jurisdiction: 'CIVIL', caseType: 'PCS_PR_', cid: '123' },
      { eid: 'ext:custom' }
    ]);
    const result = service.getRedirectUrlFromRoute(route);

    expect(result).toBeNull();
  });

  it('should return null when multiple prefixes match', () => {
    environmentService.get.and.returnValue({
      PCS: 'https://pcs.example',
      PCS_PR_: 'https://pcs-api-pr-%s.preview.platform'
    });

    const route = buildSnapshot([
      { jurisdiction: 'CIVIL', caseType: 'PCS_PR_1234', cid: '123' },
      { eid: 'ext:custom' }
    ]);
    const result = service.getRedirectUrlFromRoute(route);

    expect(result).toBeNull();
  });

  it('should return null when jurisdiction is missing for create event', () => {
    environmentService.get.and.returnValue({ PCS: 'https://pcs.example' });
    sessionStorageService.getItem.and.returnValue(JSON.stringify({ id: 'user-789' }));

    const route = buildSnapshot([
      { ctid: 'PCS', eid: 'ext:custom' }
    ]);

    const result = service.getRedirectUrlFromRoute(route);
    expect(result).toBeNull();
  });
});
