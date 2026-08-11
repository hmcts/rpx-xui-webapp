import { DecentralisedRedirectService } from './decentralised-redirect.service';
import { SessionStorageService } from '../app/services';
import { UserInfo } from '../app/models/user-details.model';

describe('DecentralisedRedirectService', () => {
  let decentralisedRedirectService: DecentralisedRedirectService;

  let environmentService: any;
  let sessionStorageService: SessionStorageService;
  let window: Window;
  let userInfo: UserInfo;

  beforeEach(() => {
    environmentService = jasmine.createSpyObj('environmentService', ['get']);
    sessionStorageService = jasmine.createSpyObj('sessionStorageService', ['getItem']);
    window = {} as Window;

    decentralisedRedirectService = new DecentralisedRedirectService(environmentService, sessionStorageService, window);

    userInfo = {} as UserInfo;
  });

  describe('getUrl', () => {
    it('uses the given service URL when no service ID', () => {
      expect(decentralisedRedirectService.getUrl('', 'S_URL', userInfo)).toBe('S_URL');
      expect(environmentService.get).not.toHaveBeenCalled();
    });

    it('uses the given service URL when no service URL', () => {
      expect(decentralisedRedirectService.getUrl('S_ID', '', userInfo)).toBe('');
      expect(environmentService.get).not.toHaveBeenCalled();
    });

    it('uses the given service URL when no service map is in the environment', () => {
      expect(decentralisedRedirectService.getUrl('S_ID', 'S_URL', userInfo)).toBe('S_URL');
      expect(environmentService.get).toHaveBeenCalledWith(DecentralisedRedirectService.SERVICE_MAP_ENV_VAR_NAME);
    });

    it('uses the given service URL when service map has no matching service', () => {
      const serviceUrl = 'http://localhost/service-path';

      const serviceMap = {
        S1_ID: { id: 'S1_ID', baseUrl: 'http://127.0.0.1' },
      };

      environmentService.get.and.returnValue(serviceMap);

      expect(decentralisedRedirectService.getUrl('S_ID', serviceUrl, userInfo)).toBe(serviceUrl);
      expect(environmentService.get).toHaveBeenCalledWith(DecentralisedRedirectService.SERVICE_MAP_ENV_VAR_NAME);
    });

    it('uses the given service URL when it starts with the service base URL', () => {
      const baseUrl = 'http://localhost';
      const serviceUrl = 'http://localhost/service-path';

      const serviceMap = {
        S_ID: { id: 'S_ID', baseUrl: baseUrl },
      };

      environmentService.get.and.returnValue(serviceMap);

      expect(decentralisedRedirectService.getUrl('S_ID', serviceUrl, userInfo)).toBe(new URL(serviceUrl).toString());
      expect(environmentService.get).toHaveBeenCalledWith(DecentralisedRedirectService.SERVICE_MAP_ENV_VAR_NAME);
    });

    it('gets the absolute URL when from the service base URL and the service relative URL', () => {
      const baseUrl = 'http://localhost';
      const serviceUrl = '/service-path';

      const serviceMap = {
        S_ID: { id: 'S_ID', baseUrl: baseUrl },
      };

      environmentService.get.and.returnValue(serviceMap);

      expect(decentralisedRedirectService.getUrl('S_ID', serviceUrl, userInfo)).toBe('http://localhost/service-path');
      expect(environmentService.get).toHaveBeenCalledWith(DecentralisedRedirectService.SERVICE_MAP_ENV_VAR_NAME);
    });

    it('gets the absolute URL including a dividing / char', () => {
      const baseUrl = 'http://localhost';
      const serviceUrl = 'service-path';

      const serviceMap = {
        S_ID: { id: 'S_ID', baseUrl: baseUrl },
      };

      environmentService.get.and.returnValue(serviceMap);

      expect(decentralisedRedirectService.getUrl('S_ID', serviceUrl, userInfo)).toBe('http://localhost/service-path');
      expect(environmentService.get).toHaveBeenCalledWith(DecentralisedRedirectService.SERVICE_MAP_ENV_VAR_NAME);
    });

    it('gets the absolute URL including a parameter with the user ID', () => {
      userInfo = { id: 'U_ID' } as UserInfo;

      const baseUrl = 'http://localhost';
      const serviceUrl = 'service-path';

      const serviceMap = {
        S_ID: { id: 'S_ID', baseUrl: baseUrl },
      };

      environmentService.get.and.returnValue(serviceMap);

      expect(decentralisedRedirectService.getUrl('S_ID', serviceUrl, userInfo)).toBe(
        'http://localhost/service-path?expected_sub=U_ID'
      );
      expect(environmentService.get).toHaveBeenCalledWith(DecentralisedRedirectService.SERVICE_MAP_ENV_VAR_NAME);
    });

    it('gets the absolute URL including a parameter with the user UID', () => {
      userInfo = { uid: 'U_UID' } as UserInfo;

      const baseUrl = 'http://localhost';
      const serviceUrl = 'service-path';

      const serviceMap = {
        S_ID: { id: 'S_ID', baseUrl: baseUrl },
      };

      environmentService.get.and.returnValue(serviceMap);

      expect(decentralisedRedirectService.getUrl('S_ID', serviceUrl, userInfo)).toBe(
        'http://localhost/service-path?expected_sub=U_UID'
      );
      expect(environmentService.get).toHaveBeenCalledWith(DecentralisedRedirectService.SERVICE_MAP_ENV_VAR_NAME);
    });
  });

  describe(`decentralisedRedirectService.buildDecentralisedEventUrl`, () => {
    it('should build an external URL for existing case events', () => {
      const url = decentralisedRedirectService.buildDecentralisedEventUrl(
        {
          caseType: 'pcs',
          caseId: '1234567890',
          isCaseCreate: false,
          eventId: 'ext:fooEvent',
          queryParams: { tid: 'task-1', foo: 'bar' },
        },
        { PCS: { webUrl: 'https://pcs-frontend.service.gov.uk' } },
        'user-123'
      );

      expect(url).toBe(
        'https://pcs-frontend.service.gov.uk/cases/1234567890/event/ext%3AfooEvent?tid=task-1&foo=bar&expected_sub=user-123'
      );
    });

    it('should build an external URL for case-create events', () => {
      const url = decentralisedRedirectService.buildDecentralisedEventUrl(
        {
          caseType: 'PCS',
          jurisdiction: 'IA',
          eventId: 'ext:createCase',
          isCaseCreate: true,
        },
        { PCS: { webUrl: 'https://pcs-frontend.service.gov.uk' } },
        'user-456'
      );

      expect(url).toBe('https://pcs-frontend.service.gov.uk/cases/case-create/IA/PCS/ext%3AcreateCase?expected_sub=user-456');
    });

    it('should return null when the event is not decentralised', () => {
      const url = decentralisedRedirectService.buildDecentralisedEventUrl(
        {
          caseType: 'PCS',
          caseId: '1234567890',
          isCaseCreate: false,
          eventId: 'standardEvent',
        },
        { PCS: { webUrl: 'https://pcs-frontend.service.gov.uk' } },
        'user-123'
      );

      expect(url).toBeNull();
    });

    it('should return null when case type is missing at runtime', () => {
      const url = decentralisedRedirectService.buildDecentralisedEventUrl(
        {
          caseType: undefined,
          caseId: '1234567890',
          isCaseCreate: false,
          eventId: 'ext:fooEvent',
        } as any,
        { PCS: { webUrl: 'https://pcs-frontend.service.gov.uk' } },
        'user-123'
      );

      expect(url).toBeNull();
    });

    it('should prefer the longest matching prefix for web URL resolution', () => {
      const url = decentralisedRedirectService.buildDecentralisedEventUrl(
        {
          caseType: 'Prefix-Case',
          caseId: '123',
          isCaseCreate: false,
          eventId: 'ext:fooEvent',
        },
        {
          pre: { webUrl: 'https://one.test' },
          prefix: { webUrl: 'https://two.test' },
        },
        'user-123'
      );

      expect(url).toBe('https://two.test/cases/123/event/ext%3AfooEvent?expected_sub=user-123');
    });

    it('should resolve web URL from a template with %s placeholder', () => {
      const url = decentralisedRedirectService.buildDecentralisedEventUrl(
        {
          caseType: 'PCS_PR_1234',
          caseId: '123',
          isCaseCreate: false,
          eventId: 'ext:fooEvent',
        },
        {
          PCS_PR_: { webUrl: 'https://pcs-xui-pr-%s.preview.platform' },
        },
        'user-123'
      );

      expect(url).toBe('https://pcs-xui-pr-1234.preview.platform/cases/123/event/ext%3AfooEvent?expected_sub=user-123');
    });
  });

  describe('getExpectedSubFromUserDetails', () => {
    [
      { input: JSON.stringify({ id: 'user-123', uid: 'user-uid' }), expected: 'user-123', name: 'prefer id when present' },
      { input: JSON.stringify({ uid: 'user-uid' }), expected: 'user-uid', name: 'fallback to uid' },
      { input: null, expected: null, name: 'return null when userDetails missing' },
      { input: '{bad json', expected: null, name: 'return null for malformed JSON' },
    ].forEach(({ input, expected, name }) => {
      it(`should ${name} when reading expected sub from userDetails`, () => {
        expect(DecentralisedRedirectService.getExpectedSubFromUserDetails(input)).toBe(expected);
      });
    });
  });
});
