import { ModuleWithProviders } from '@angular/core';
// routes
import { RouterModule, Routes } from '@angular/router';
import { CaseResolver, editorRouting, viewerRouting as caseViewRouting } from '@hmcts/ccd-case-ui-toolkit';
import { HealthCheckGuard } from 'src/app/shared/guards/health-check.guard';
import {
  CaseCreateSubmitComponent,
  CaseDetailsHomeComponent,
  CaseFilterComponent,
  CaseHomeComponent,
  CaseListComponent,
  CasesCreateComponent,
  CaseShareCompleteComponent,
  CaseShareComponent,
  CaseShareConfirmComponent
} from './containers';
import { CaseSearchComponent } from './containers/case-search/case-search.component';
import { CaseViewerContainerComponent } from './containers/case-viewer-container/case-viewer-container.component';
import { RolesAndAccessContainerComponent } from './containers/roles-and-access-container/roles-and-access-container.component';
import { TasksContainerComponent } from './containers/tasks-container/tasks-container.component';
import { ActivityResolver } from './resolvers/activity.resolver';
import { CaseRolesResolverService } from './resolvers/case-roles-resolver.service';
import { CreateCaseEventTriggerResolver } from './resolvers/create-case-event-trigger.resolver';

export const ROUTES: Routes = [
  {
    path: '',
    resolve: {
      activity: ActivityResolver,
    },
    component: CaseHomeComponent,
    children: [
      {
        path: '',
        component: CaseListComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'Case list'
        }
      },
      {
        path: 'case-share',
        component: CaseShareComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Share Cases | Case Share'
        }
      },
      {
        path: 'case-share-confirm',
        component: CaseShareConfirmComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Share Cases | Case Share Confirm'
        }
      },
      {
        path: 'case-share-complete',
        component: CaseShareCompleteComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Share Cases | Case Share Complete'
        }
      },
      {
        path: 'case-filter',
        component: CaseFilterComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'Create a case'
        }
      },
      {
        path: 'case-create',
        children: [
          {
            path: '',
            component: CasesCreateComponent
          },
          {
            path: ':jid/:ctid/:eid',
            component: CaseCreateSubmitComponent,
            resolve: {
              eventTrigger: CreateCaseEventTriggerResolver
            },
            children: editorRouting
          }
        ],
        canActivate: [HealthCheckGuard],
        data: {
          title: 'Create a case'
        }
      },
      {
        path: 'case-search',
        component: CaseSearchComponent,
        children: editorRouting,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'Find a case'
        }
      },
      {
        path: 'case-details/:cid',
        component: CaseDetailsHomeComponent,
        resolve: {case: CaseResolver},
        runGuardsAndResolvers: 'always',
        children: [
          {
            path: '',
            component: CaseViewerContainerComponent,
            children: [
              {
                path: '',
                pathMatch: 'full',
              },
              {
                path: 'tasks',
                component: TasksContainerComponent
              },
              {
                path: 'roles-and-access',
                component: RolesAndAccessContainerComponent,
                resolve: {roles: CaseRolesResolverService}
              }
            ]
          },
          ...caseViewRouting],
        canActivate: [HealthCheckGuard],
        data: {
          title: 'Case Details'
        }
      }
    ]
  },

];

export const casesRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);

