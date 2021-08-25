import * as addExclusionContainers from './add-exclusion';
import * as allocateRoleContainers from './allocate-role';
import { DeleteExclusionComponent } from './delete-exclusion/delete-exclusion.component';

export const containers: any[] = [
  ...addExclusionContainers.containers,
  ...allocateRoleContainers.containers,
  DeleteExclusionComponent
];

export * from './delete-exclusion/delete-exclusion.component';
