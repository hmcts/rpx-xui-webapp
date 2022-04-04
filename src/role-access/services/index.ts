import { AllocateRoleService } from './allocate-role.service';
import { DurationHelperService } from './duration-helper.service';
import { RoleExclusionsService } from './role-exclusions.service';

export const services: any[] = [
  AllocateRoleService,
  DurationHelperService,
  RoleExclusionsService
];

export * from './allocate-role.service';
export * from './duration-helper.service';
export * from './role-exclusions.service';
