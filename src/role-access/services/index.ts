import { RoleAssignmentService } from './role-assignment.service';
import { RoleExclusionsService } from './role-exclusions.service';

export const services: any[] = [RoleAssignmentService, RoleExclusionsService];

export * from './role-assignment.service';
export * from './role-exclusions.service';
