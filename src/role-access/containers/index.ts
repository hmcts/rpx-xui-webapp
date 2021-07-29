import * as addExclusionContainers from './add-exclusion';
import * as allocateRoleContainers from './allocate-role';
import { RoleAccessComponent } from './role-and-access/role-access.component';

export const containers: any[] = [
  ...addExclusionContainers.containers,
  ...allocateRoleContainers.containers,
  RoleAccessComponent,
];
