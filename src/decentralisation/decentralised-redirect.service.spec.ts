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
});
