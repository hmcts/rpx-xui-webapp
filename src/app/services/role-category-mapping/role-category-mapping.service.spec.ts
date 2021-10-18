import { of } from 'rxjs';
import { UserRole } from '../../models/user-details.model';
import { RoleCategoryMappingService, RoleMapping } from './role-category-mapping.service';

describe('Role category mapping service', () => {
  let roleCategoryMappingService: RoleCategoryMappingService;
  let mockFeatureService: any;
  const ROLE_MAPPINGS: RoleMapping = {
    JUDICIAL_ROLE_LIST: [
      'caseworker-sscs-judge',
    ],
    LEGAL_OPS_ROLE_LIST: [
      'caseworker-sscs',
    ]
  };
  beforeEach(() => {
    mockFeatureService = jasmine.createSpyObj('FeatureToggleService', ['getValueOnce']);
    mockFeatureService.getValueOnce.and.returnValues(of(ROLE_MAPPINGS));
    roleCategoryMappingService = new RoleCategoryMappingService(mockFeatureService);
  });

  it('should create service', () => {
    expect(roleCategoryMappingService).toBeTruthy();
  });

  it('should return true if there is judicial user role when calling isJudicialCategory', () => {
    const USER_ROLES: string[] = ['caseworker-sscs', 'caseworker-sscs-judge'];
    roleCategoryMappingService.isJudicialCategory(of(USER_ROLES)).subscribe(isJudicialCategory =>
      expect(isJudicialCategory).toBeTruthy());
  });

  it('should return false if no judicial user role when calling isJudicialCategory', () => {
    const USER_ROLES: string[] = ['caseworker-sscs'];
    roleCategoryMappingService.isJudicialCategory(of(USER_ROLES)).subscribe(isJudicialCategory =>
      expect(isJudicialCategory).toBeFalsy());
  });

  it('should return true if there is legal ops user role when calling isLegalOpsCategory', () => {
    const USER_ROLES: string[] = ['caseworker-sscs'];
    roleCategoryMappingService.isLegalOpsCategory(of(USER_ROLES)).subscribe(isLegalOpsCategory =>
      expect(isLegalOpsCategory).toBeTruthy());
  });

  it('should return false if no legal ops user role when calling isLegalOpsCategory', () => {
    const USER_ROLES: string[] = ['caseworker-sscs-judge'];
    roleCategoryMappingService.isLegalOpsCategory(of(USER_ROLES)).subscribe(isLegalOpsCategory =>
      expect(isLegalOpsCategory).toBeFalsy());
  });

  it('should return Judicial if there is judicial role when calling isJudicialOrLegalOpsCategory', () => {
    const USER_ROLES: string[] = ['caseworker-sscs-judge'];
    roleCategoryMappingService.isJudicialOrLegalOpsCategory(of(USER_ROLES)).subscribe(isJudicialOrLegalOpsCategory =>
      expect(isJudicialOrLegalOpsCategory).toBe(UserRole.Judicial));
  });

  it('should return Legalops if there is legal ops user role when calling isJudicialOrLegalOpsCategory', () => {
    const USER_ROLES: string[] = ['caseworker-sscs'];
    roleCategoryMappingService.isJudicialOrLegalOpsCategory(of(USER_ROLES)).subscribe(isJudicialOrLegalOpsCategory =>
      expect(isJudicialOrLegalOpsCategory).toBe(UserRole.LegalOps));
  });
});
