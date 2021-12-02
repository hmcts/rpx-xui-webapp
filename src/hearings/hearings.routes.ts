import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HealthCheckGuard} from '../app/shared/guards/health-check.guard';
import {CancelHearingComponent} from './containers/cancel-hearing/cancel-hearing.component';
import {ChangeHearingComponent} from './containers/change-hearing/change-hearing.component';
import {AdditionalFacilitiesComponent} from './containers/request-hearing/additional-facilities/additional-facilities.component';
import {AdditionalInstructionComponent} from './containers/request-hearing/additional-instruction/additional-instruction.component';
import {CheckAnswersComponent} from './containers/request-hearing/check-answers/check-answers.component';
import {HearingRequirementComponent} from './containers/request-hearing/hearing-requirement/hearing-requirement.component';
import {HearingStageComponent} from './containers/request-hearing/hearing-stage/hearing-stage.component';
import {HearingTimingComponent} from './containers/request-hearing/hearing-timing/hearing-timing.component';
import {HowPartyAttendComponent} from './containers/request-hearing/how-party-attend/how-party-attend.component';
import {LocationSearchComponent} from './containers/request-hearing/location-search/location-search.component';
import {RequestHearingComponent} from './containers/request-hearing/request-hearing.component';
import {RequirePanelOrNotComponent} from './containers/request-hearing/require-panel-or-not/require-panel-or-not.component';
import {SpecifyJudgeComponent} from './containers/request-hearing/specify-judge/specify-judge.component';
import {WelshHearingComponent} from './containers/request-hearing/welsh-hearing/welsh-hearing.component';
import {ViewHearingComponent} from './containers/view-hearing/view-hearing.component';
import {PriorityResolver} from './resolvers/priority/priority.resolve';

export const ROUTES: Routes = [
  {
    path: 'cancel',
    component: CancelHearingComponent,
    children: [
      {
        path: '',
        component: null,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Cancel Hearing'
        }
      }
    ]
  },
  {
    path: 'change',
    component: ChangeHearingComponent,
    children: [
      {
        path: '',
        component: null,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Change Hearing'
        }
      }
    ]
  },
  {
    path: 'request',
    component: RequestHearingComponent,
    children: [
      {
        path: '',
        redirectTo: 'hearing-requirement',
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing'
        }
      },
      {
        path: 'hearing-requirement',
        component: HearingRequirementComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Hearings | Request Hearing | Hearing Requirement'
        }
      },
      {
        path: 'additional-facilities',
        component: AdditionalFacilitiesComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Hearings | Request Hearing | Additional Facilities'
        }
      },
      {
        path: 'hearing-stage',
        component: HearingStageComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Hearings | Request Hearing | Hearing Stage'
        }
      },
      {
        path: 'how-party-attend',
        component: HowPartyAttendComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Hearings | Request Hearing | How Party Attend'
        }
      },
      {
        path: 'location-search',
        component: LocationSearchComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Hearings | Request Hearing | Location Search'
        }
      },
      {
        path: 'welsh-hearing',
        component: WelshHearingComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Welsh Hearing'
        }
      },
      {
        path: 'specify-judge',
        component: SpecifyJudgeComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Specify Judge'
        }
      },
      {
        path: 'require-panel-or-not',
        component: RequirePanelOrNotComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Require Panel Or Not'
        }
      },
      {
        path: 'hearing-timing',
        resolve: {hearingPriorities: PriorityResolver},
        component: HearingTimingComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Hearing Timing'
        }
      },
      {
        path: 'additional-instruction',
        component: AdditionalInstructionComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Additional Instruction'
        }
      },
      {
        path: 'check-answers',
        component: CheckAnswersComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Check Answers'
        }
      },
      // {
      //   path: 'date-priority-hearing',
      //   resolve: {hearingPriorities: PriorityResolver},
      //   component: HearingTimingComponent,
      //   canActivate: [HealthCheckGuard],
      //   data: {
      //     title: 'HMCTS Manage cases | Request Hearing | Date Priority Hearing'
      //   }
      // },
    ]
  },
  {
    path: 'view',
    component: ViewHearingComponent,
    children: [
      {
        path: '',
        component: null,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | View Hearing'
        }
      }
    ]
  },
];

export const hearingsRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
