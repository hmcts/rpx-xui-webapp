import * as addExclusionContainers from './add-exclusion';
import * as allocateRoleContainers from './allocate-role';
import { DeleteExclusionComponent } from './delete-exclusion/delete-exclusion.component';
import { RemoveRoleComponent } from './remove-role/remove-role.component';
import { RoleAccessComponent } from './role-and-access/role-access.component';

export const containers: any[] = [
  ...addExclusionContainers.containers,
  ...allocateRoleContainers.containers,
  RoleAccessComponent,
  DeleteExclusionComponent,
  RemoveRoleComponent
];

export * from './role-and-access/role-access.component';
export * from './delete-exclusion/delete-exclusion.component';
export * from './remove-role/remove-role.component';
