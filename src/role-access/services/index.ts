import { AllocateRoleService } from './allocate-role.service';
import { RoleExclusionsService } from './role-exclusions.service';

export const services: any[] = [AllocateRoleService, RoleExclusionsService];

export * from './allocate-role.service';
export * from './role-exclusions.service';
