import * as addExclusionContainers from './add-exclusion';
import * as allocateRoleContainers from './allocate-role';
import { DeleteExclusionComponent } from './delete-exclusion/delete-exclusion.component';
import { RejectedRequestViewComponent } from './rejected-request-view/rejected-request-view.component';
import { RemoveRoleComponent } from './remove-role/remove-role.component';
import * as specificAccessContainers from './specific-access';

export const containers: any[] = [
  ...addExclusionContainers.containers,
  ...allocateRoleContainers.containers,
  ...specificAccessContainers.containers,
  DeleteExclusionComponent,
  RemoveRoleComponent,
  RejectedRequestViewComponent
];

export * from './delete-exclusion/delete-exclusion.component';
export * from './remove-role/remove-role.component';
export * from './rejected-request-view/rejected-request-view.component';
