import { CaseRolesTableComponent } from '../../role-access/components/case-roles-table/case-roles-table.component';
import { ExclusionsTableComponent } from '../../role-access/components/exclusions-table/exclusions-table.component';
import { AlertComponent } from './case-alert/alert.component';
import { RolesAndAccessComponent } from './roles-and-access/roles-and-access.component';

export const components: any[] = [
  AlertComponent,
  CaseRolesTableComponent,
  ExclusionsTableComponent,
  RolesAndAccessComponent
];

export * from './case-alert/alert.component';
