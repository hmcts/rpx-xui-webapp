import { lastValueFrom, of, throwError } from 'rxjs';
import { WASupportedJurisdictionsService } from './wa-supported-jurisdiction.service';
import { WASupportedRoleDetailsService } from './wa-supported-role-details.service';
import { WAVerificationService } from './wa-verification.service';

describe('WorkAllocation', () => {
  describe('WAVerificationService', () => {
    let service: WAVerificationService;
    let waSupportedRoleDetailsService: jasmine.SpyObj<WASupportedRoleDetailsService>;
    let waSupportedJurisdictionsService: jasmine.SpyObj<WASupportedJurisdictionsService>;

    beforeEach(() => {
      waSupportedRoleDetailsService = jasmine.createSpyObj<WASupportedRoleDetailsService>('waSupportedRoleDetailsService', [
        'getWASupportedRoleCategories',
        'getWASupportedRoleTypes',
      ]);
      waSupportedJurisdictionsService = jasmine.createSpyObj<WASupportedJurisdictionsService>('waSupportedJurisdictionsService', [
        'getWASupportedJurisdictions',
      ]);
      service = new WAVerificationService(waSupportedRoleDetailsService, waSupportedJurisdictionsService);
    });

    it('should be Truthy', () => {
      expect(service).toBeTruthy();
    });

    it('combines supported role categories, role types and jurisdictions into WA verification details', async () => {
      waSupportedRoleDetailsService.getWASupportedRoleCategories.and.returnValue(of(['LEGAL_OPERATIONS']));
      waSupportedRoleDetailsService.getWASupportedRoleTypes.and.returnValue(of(['ORGANISATION']));
      waSupportedJurisdictionsService.getWASupportedJurisdictions.and.returnValue(of(['IA', 'CIVIL']));

      const result = await lastValueFrom(service.getWAVerification());

      expect(result).toEqual({
        waSupportedCategories: ['LEGAL_OPERATIONS'],
        waSupportedRoleTypes: ['ORGANISATION'],
        waSupportedJurisdictions: ['IA', 'CIVIL'],
      });
      expect(waSupportedRoleDetailsService.getWASupportedRoleCategories).toHaveBeenCalled();
      expect(waSupportedRoleDetailsService.getWASupportedRoleTypes).toHaveBeenCalled();
      expect(waSupportedJurisdictionsService.getWASupportedJurisdictions).toHaveBeenCalled();
    });

    it('returns empty arrays for failed supported role detail and jurisdiction lookups', async () => {
      waSupportedRoleDetailsService.getWASupportedRoleCategories.and.returnValue(
        throwError(() => new Error('role categories failed'))
      );
      waSupportedRoleDetailsService.getWASupportedRoleTypes.and.returnValue(of(['ORGANISATION']));
      waSupportedJurisdictionsService.getWASupportedJurisdictions.and.returnValue(
        throwError(() => new Error('jurisdictions failed'))
      );

      const result = await lastValueFrom(service.getWAVerification());

      expect(result).toEqual({
        waSupportedCategories: [],
        waSupportedRoleTypes: ['ORGANISATION'],
        waSupportedJurisdictions: [],
      });
    });
  });
});
