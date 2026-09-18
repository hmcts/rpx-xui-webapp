import { DecentralisedRedirectService } from './decentralised-redirect.service';
import { SessionStorageService } from '../app/services';
import { UserInfo } from '../app/models/user-details.model';
import { DecentralisedEvent } from './decentralised-event';
import { JudgeTypesAmendedConverter } from 'src/hearings/converters/judge-types.amended.converter';

describe('DecentralisedRedirectService', () => {
  let decentralisedRedirectService: DecentralisedRedirectService;

  let environmentService: any;
  let sessionStorageService: any;
  let window: Window;
  let userInfo: UserInfo;

  beforeEach(() => {
    environmentService = jasmine.createSpyObj('environmentService', ['get']);
    sessionStorageService = jasmine.createSpyObj('sessionStorageService', ['getItem']);
    window = {
      location: jasmine.createSpyObj('window.location', ['assign']),
    } as Window;

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

    it('gets the absolute URL with only a single dividing / char', () => {
      const baseUrl = 'http://localhost/';
      const serviceUrl = '/service-path';

      const serviceMap = {
        S_ID: { id: 'S_ID', baseUrl: baseUrl },
      };

      environmentService.get.and.returnValue(serviceMap);

      expect(decentralisedRedirectService.getUrl('S_ID', serviceUrl, userInfo)).toBe('http://localhost/service-path');
      expect(environmentService.get).toHaveBeenCalledWith(DecentralisedRedirectService.SERVICE_MAP_ENV_VAR_NAME);
    });

    it('gets the absolute URL including a parameter with the user ID', () => {
      userInfo = { id: 'U_ID' } as UserInfo;

      const baseUrl = 'http://localhost/';
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

  describe('isDecentralisedEvent', () => {
    it('determines whether an event is decentralised', () => {
      expect(decentralisedRedirectService.isDecentralisedEvent('')).toBeFalsy();
      expect(decentralisedRedirectService.isDecentralisedEvent('A')).toBeFalsy();
      expect(decentralisedRedirectService.isDecentralisedEvent('a')).toBeFalsy();
      expect(decentralisedRedirectService.isDecentralisedEvent('xt:a')).toBeFalsy();
      expect(decentralisedRedirectService.isDecentralisedEvent('aext:bext:')).toBeFalsy();
      expect(decentralisedRedirectService.isDecentralisedEvent(null)).toBeFalsy();
      expect(decentralisedRedirectService.isDecentralisedEvent()).toBeFalsy();

      expect(decentralisedRedirectService.isDecentralisedEvent('ext:')).toBeTruthy();
      expect(decentralisedRedirectService.isDecentralisedEvent('ext:a')).toBeTruthy();
      expect(decentralisedRedirectService.isDecentralisedEvent('ext:aaaa:ext')).toBeTruthy();
    });
  });

  describe('tryRedirectEvent', () => {
    const event = DecentralisedEvent.forCase('E', 'PCS', 'C');

    it('throws an error when no caseTypeMap is found for the case type', () => {
      expect(() => decentralisedRedirectService.tryRedirectEvent(event)).toThrow(
        new Error(`Event E is decentralised for case type PCS but the required parameters are not provided`)
      );
    });

    it('throws an error when no baseUrl is found for the case type', () => {
      const caseTypeMap = {
        PT: { webUrl: 'https://pcs-frontend.service.gov.uk' },
      };

      environmentService.get.and.returnValue(caseTypeMap);

      expect(() => decentralisedRedirectService.tryRedirectEvent(event)).toThrow(
        new Error(`Event E is decentralised for case type PCS but the required parameters are not provided`)
      );
      expect(environmentService.get).toHaveBeenCalledWith(DecentralisedRedirectService.CASE_TYPE_MAP_ENV_VAR_NAME);
    });

    it('redirects the event when a baseUrl is found but no userID', () => {
      const caseTypeMap = {
        PCS: { webUrl: 'https://pcs-frontend.service.gov.uk' },
      };

      environmentService.get.and.returnValue(caseTypeMap);

      expect(decentralisedRedirectService.tryRedirectEvent(event)).toBeTruthy();
      expect(window.location.assign).toHaveBeenCalledWith('https://pcs-frontend.service.gov.uk/cases/C/event/E');
    });

    it('redirects the event when a baseUrl is found and a userID exists', () => {
      sessionStorageService.getItem.and.returnValue(JSON.stringify({ id: 'user-123', uid: 'user-uid' }));

      const caseTypeMap = {
        PCS: { webUrl: 'https://pcs-frontend.service.gov.uk' },
      };

      environmentService.get.and.returnValue(caseTypeMap);

      expect(decentralisedRedirectService.tryRedirectEvent(event)).toBeTruthy();
      expect(window.location.assign).toHaveBeenCalledWith(
        'https://pcs-frontend.service.gov.uk/cases/C/event/E?expected_sub=user-123'
      );
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
