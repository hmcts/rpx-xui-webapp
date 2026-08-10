import { lastValueFrom, of, throwError } from 'rxjs';
import { WASupportedJurisdictionsService } from './wa-supported-jurisdiction.service';
import { WAVerificationService } from './wa-verification.service';
import { AppConfig } from '../../app/services/ccd-config/ccd-case.config';

describe('WorkAllocation', () => {
  describe('WAVerificationService', () => {
    let service: WAVerificationService;
    let appConfig: jasmine.SpyObj<AppConfig>;
    let waSupportedJurisdictionsService: jasmine.SpyObj<WASupportedJurisdictionsService>;

    beforeEach(() => {
      appConfig = jasmine.createSpyObj<AppConfig>('appConfig', ['getWASupportedRoleCategories', 'getWASupportedRoleTypes']);
      waSupportedJurisdictionsService = jasmine.createSpyObj<WASupportedJurisdictionsService>('waSupportedJurisdictionsService', [
        'getWASupportedJurisdictions',
      ]);
      service = new WAVerificationService(waSupportedJurisdictionsService, appConfig);
    });

    it('should be Truthy', () => {
      expect(service).toBeTruthy();
    });

    it('combines supported role categories, role types and jurisdictions into WA verification details', async () => {
      appConfig.getWASupportedRoleCategories.and.returnValue(['LEGAL_OPERATIONS']);
      appConfig.getWASupportedRoleTypes.and.returnValue(['ORGANISATION']);
      waSupportedJurisdictionsService.getWASupportedJurisdictions.and.returnValue(of(['IA', 'CIVIL']));

      const result = await lastValueFrom(service.getWAVerification());

      expect(result).toEqual({
        waSupportedCategories: ['LEGAL_OPERATIONS'],
        waSupportedRoleTypes: ['ORGANISATION'],
        waSupportedJurisdictions: ['IA', 'CIVIL'],
      });
      expect(appConfig.getWASupportedRoleCategories).toHaveBeenCalled();
      expect(appConfig.getWASupportedRoleTypes).toHaveBeenCalled();
      expect(waSupportedJurisdictionsService.getWASupportedJurisdictions).toHaveBeenCalled();
    });

    it('returns empty role categories and role types when AppConfig provides empty arrays', async () => {
      appConfig.getWASupportedRoleCategories.and.returnValue([]);
      appConfig.getWASupportedRoleTypes.and.returnValue([]);
      waSupportedJurisdictionsService.getWASupportedJurisdictions.and.returnValue(of(['IA']));

      const result = await lastValueFrom(service.getWAVerification());

      expect(result).toEqual({
        waSupportedCategories: [],
        waSupportedRoleTypes: [],
        waSupportedJurisdictions: ['IA'],
      });
    });

    it('returns empty array for failed supported jurisdiction lookup', async () => {
      appConfig.getWASupportedRoleCategories.and.returnValue(['LEGAL_OPERATIONS']);
      appConfig.getWASupportedRoleTypes.and.returnValue(['ORGANISATION']);
      waSupportedJurisdictionsService.getWASupportedJurisdictions.and.returnValue(
        throwError(() => new Error('jurisdictions failed'))
      );

      const result = await lastValueFrom(service.getWAVerification());

      expect(result).toEqual({
        waSupportedCategories: ['LEGAL_OPERATIONS'],
        waSupportedRoleTypes: ['ORGANISATION'],
        waSupportedJurisdictions: [],
      });
    });
  });
});
