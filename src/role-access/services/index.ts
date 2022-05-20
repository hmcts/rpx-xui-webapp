import { AllocateRoleService } from './allocate-role.service';
import { DurationHelperService } from './duration-helper.service';
import { RoleExclusionsService } from './role-exclusions.service';
import { SpecificAccessService } from './specific-access.service';

export const services: any[] = [
  AllocateRoleService,
  DurationHelperService,
  RoleExclusionsService,
  SpecificAccessService
];

export * from './allocate-role.service';
export * from './duration-helper.service';
export * from './role-exclusions.service';
export * from './specific-access.service';
