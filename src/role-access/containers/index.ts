import * as addExclusionContainers from './add-exclusion';
import * as allocateRoleContainers from './allocate-role';
import * as specificAccessContainers from './specific-access';
import { DeleteExclusionComponent } from './delete-exclusion/delete-exclusion.component';
import { RemoveRoleComponent } from './remove-role/remove-role.component';

export const containers: any[] = [
  ...addExclusionContainers.containers,
  ...allocateRoleContainers.containers,
  ...specificAccessContainers.containers,
  DeleteExclusionComponent,
  RemoveRoleComponent
];

export * from './delete-exclusion/delete-exclusion.component';
export * from './remove-role/remove-role.component';
