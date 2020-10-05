import { ModuleWithProviders } from '@angular/core';
// routes
import { RouterModule, Routes } from '@angular/router';
import { CaseResolver, editorRouting, viewerRouting as caseViewRouting } from '@hmcts/ccd-case-ui-toolkit';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { CaseCreateSubmitComponent, CasesCreateComponent } from './containers';
import { CaseDetailsHomeComponent } from './containers/case-details-home/case-details-home';
import { CaseFilterComponent } from './containers/case-filter/case-filter.component';
import { CaseHomeComponent } from './containers/case-home/case-home.component';
import { CaseListComponent } from './containers/case-list/case-list.component';
import { CaseSearchComponent } from './containers/case-search/case-search.component';
import { ActivityResolver } from './resolvers/activity.resolver';
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
          canActivate: [ HealthCheckGuard ],
          data: {
            title: 'HMCTS Manage Cases | Case list'
          }
        },
        {
          path: 'case-filter',
          component: CaseFilterComponent,
          canActivate: [ HealthCheckGuard ],
          data: {
            title: 'HMCTS Manage Cases | Create a case'
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
          canActivate: [ HealthCheckGuard ],
          data: {
            title: 'HMCTS Manage Cases | Create a case'
          }
        },
        {
          path: 'case-search',
          component: CaseSearchComponent,
          children: editorRouting,
          canActivate: [ HealthCheckGuard ],
          data: {
            title: 'HMCTS Manage Cases | Find a case'
          }
        },
        {
          path: 'case-details/:cid',
          component: CaseDetailsHomeComponent,
          resolve: { case: CaseResolver },
          runGuardsAndResolvers: 'always',
          children: caseViewRouting,
          canActivate: [ HealthCheckGuard ],
          data: {
            title: 'HMCTS Manage Cases | Case'
          }
        }
      ]
    },


];

export const casesRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);

