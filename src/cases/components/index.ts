import { CaseRolesTableComponent } from '../../role-access/components/case-roles-table/case-roles-table.component';
import { ExclusionsTableComponent } from '../../role-access/components/exclusions-table/exclusions-table.component';
import { AlertComponent } from './case-alert/alert.component';
import { CaseTaskComponent } from './case-task/case-task.component';
import { RolesAndAccessComponent } from './roles-and-access/roles-and-access.component';
import { TaskAlertBannerComponent } from './task-alert-banner/task-alert-banner.component';

export const components: any[] = [
  AlertComponent,
  CaseRolesTableComponent,
  ExclusionsTableComponent,
  RolesAndAccessComponent,
  TaskAlertBannerComponent,
  CaseTaskComponent
];

export * from './case-alert/alert.component';
export * from './task-alert-banner/task-alert-banner.component';
export * from './case-task/case-task.component';
