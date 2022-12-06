import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskSupervisorGuard } from '../app/guards/task-supervisor.guard';

import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { TaskActionConstants } from './components/constants';
import {
  AllWorkCaseComponent,
  AllWorkHomeComponent,
  AllWorkTaskComponent,
  AvailableTasksComponent,
  MyTasksComponent,
  TaskActionContainerComponent,
  TaskAssignmentConfirmComponent,
  TaskAssignmentContainerComponent,
  TaskHomeComponent,
  WorkAllocationHomeComponent,
} from './containers';
import { MyAccessComponent } from './containers/my-access/my-access.component';
import { TaskAssignmentPersonNotAuthorisedComponent } from './containers/messages-container/task-assignment-person-not-authorised/task-assignment-person-not-authorised.component';
import { MyCasesComponent } from './containers/my-cases/my-cases.component';
import { TaskAssignmentChooseRoleComponent } from './containers/task-assignment-choose-role/task-assignment-choose-role.component';
import { TaskResolver } from './resolvers';
import { LocationResolver } from './resolvers/location-resolver.service';
import { TaskRoleResolverService } from './resolvers/task-role-resolver.service';
import { WorkAllocationAccessGuard } from './guards';

export const ROUTES: Routes = [
  {
    path: '',
    component: WorkAllocationHomeComponent,
    children: [
      {
        path: 'my-work',
        component: TaskHomeComponent,
        canActivate: [ HealthCheckGuard ],
        resolve: {
          locations: LocationResolver
        },
        children: [
          {
            path: '',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: MyTasksComponent,
            data: {
              title: 'HMCTS Manage cases | My work | My tasks', subTitle: 'My tasks'
            }
          },
          {
            path: 'available',
            component: AvailableTasksComponent,
            data: {
              title: 'HMCTS Manage cases | My work | Available tasks', subTitle: 'Available tasks'
            }
          },
          {
            path: 'my-cases',
            component: MyCasesComponent,
            data: {
              title: 'HMCTS Manage cases | My work | My cases', subTitle: 'My cases'
            }
          },
          {
            path: 'my-access',
            component: MyAccessComponent,
            canActivate: [WorkAllocationAccessGuard],
            data: {
              title: 'HMCTS Manage cases | My work | My access', subTitle: 'My access'
            }
          }
        ]
      },
      {
        path: 'all-work',
        component: AllWorkHomeComponent,
        canActivate: [ HealthCheckGuard, TaskSupervisorGuard],
        data: {
          title: 'HMCTS Manage cases | Task manager'
        },
        children: [
          {
            path: '',
            redirectTo: 'tasks'
          },
          {
            path: 'tasks',
            component: AllWorkTaskComponent,
            data: {
              title: 'HMCTS Manage cases | All work | Tasks', subTitle: 'Tasks'
            }
          },
          {
            path: 'cases',
            component: AllWorkCaseComponent,
            data: {
              title: 'HMCTS Manage cases | All work | Cases', subTitle: 'Cases'
            }
          }
        ]
      },
      {
        path: ':taskId',
        resolve: { taskAndCaseworkers: TaskResolver, roles: TaskRoleResolverService},
        children: [
          {
            path: 'assign',
            children: [
              {
                path: 'person',
                component: TaskAssignmentContainerComponent,
                data: TaskActionConstants.Assign
              },
              {
                path: 'confirm',
                component: TaskAssignmentConfirmComponent,
                data: TaskActionConstants.Assign
              },
              {
                path: '',
                component: TaskAssignmentChooseRoleComponent,
                data: TaskActionConstants.Assign
              }
            ]
          },
          {
            path: 'reassign',
            children: [
              {
                path: 'confirm',
                component: TaskAssignmentConfirmComponent,
                data: TaskActionConstants.Reassign
              },
              {
                path: 'person',
                component: TaskAssignmentContainerComponent,
                data: TaskActionConstants.Reassign
              },
              {
                path: '',
                component: TaskAssignmentChooseRoleComponent,
                data: TaskActionConstants.Reassign
              }
            ]
          },
          {
            path: 'cancel',
            component: TaskActionContainerComponent,
            data: TaskActionConstants.Cancel
          },
          {
            path: 'complete',
            component: TaskActionContainerComponent,
            data: TaskActionConstants.MarkAsDone
          },
          {
            path: 'unclaim',
            children: [
              {
                path: 'manager',
                component: TaskActionContainerComponent,
                data: TaskActionConstants.Unassign
              },
              {
                path: '',
                component: TaskActionContainerComponent,
                data: TaskActionConstants.UnassignNonManager
              }
            ]
          },
          {
            path: 'person-not-authorised',
            component: TaskAssignmentPersonNotAuthorisedComponent
          }
        ]
      }
    ]
  }
];

export const workAllocationRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(ROUTES);
