import { HttpClient } from '@angular/common/http';
import { WASupportedRoleDetailsService } from './wa-supported-role-details.service';

describe('WorkAllocation', () => {
  describe('WASupportedRoleDetailsService', () => {
    let service: WASupportedRoleDetailsService;
    let httpClient: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
      httpClient = jasmine.createSpyObj<HttpClient>('httpClient', ['get']);
      service = new WASupportedRoleDetailsService(httpClient);
    });

    it('should be Truthy', () => {
      expect(service).toBeTruthy();
    });

    it('getWASupportedRoleCategories should make the correct api call', () => {
      service.getWASupportedRoleCategories();

      expect(httpClient.get).toHaveBeenCalledWith(`${WASupportedRoleDetailsService.roleDetailsUrl}/getRoleCategories`);
    });

    it('getWASupportedRoleTypes should make the correct api call', () => {
      service.getWASupportedRoleTypes();

      expect(httpClient.get).toHaveBeenCalledWith(`${WASupportedRoleDetailsService.roleDetailsUrl}/getRoleTypes`);
    });
  });
});
