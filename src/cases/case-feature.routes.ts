import { CaseDetailsHomeComponent } from './containers/case-details-home/case-details-home';
import { ModuleWithProviders } from '@angular/core';
import { CaseHomeComponent } from './containers/case-home/case-home.component';
// routes
import { RouterModule, Routes } from '@angular/router';
import { CaseListComponent } from './containers/case-list/case-list.component';
import { CaseFilterComponent } from './containers/case-filter/case-filter.component';
import { CaseSearchComponent } from './containers/case-search/case-search.component';
import { CasesCreateComponent, CaseCreateSubmitComponent, CaseShareComponent, CaseShareConfirmComponent, CaseShareCompleteComponent } from './containers';
import { viewerRouting as caseViewRouting, editorRouting, CaseResolver } from '@hmcts/ccd-case-ui-toolkit';
import { HealthCheckGuard } from 'src/app/shared/guards/health-check.guard';
import { CreateCaseEventTriggerResolver } from './resolvers/create-case-event-trigger.resolver';

export const ROUTES: Routes = [
    {
      path: '',
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
          path: 'case-share',
          component: CaseShareComponent,
          canActivate: [ HealthCheckGuard ],
          data: {
            title: 'HMCTS Share Cases | Case Share'
          }
        },
        {
          path: 'case-share-confirm',
          component: CaseShareConfirmComponent,
          canActivate: [ HealthCheckGuard ],
          data: {
            title: 'HMCTS Share Cases | Case Share Confirm'
          }
        },
        {
          path: 'case-share-complete',
          component: CaseShareCompleteComponent,
          canActivate: [ HealthCheckGuard ],
          data: {
            title: 'HMCTS Share Cases | Case Share Complete'
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

