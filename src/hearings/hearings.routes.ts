import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HealthCheckGuard} from '../app/shared/guards/health-check.guard';
import {CancelHearingComponent} from './containers/cancel-hearing/cancel-hearing.component';
import {ChangeHearingComponent} from './containers/change-hearing/change-hearing.component';
import {HearingCheckAnswersComponent} from './containers/request-hearing/hearing-check-answers/hearing-check-answers.component';
import {HearingAdditionalInstructionsComponent} from './containers/request-hearing/hearing-additional-instructions/hearing-additional-instructions.component';
import {HearingAttendanceComponent} from './containers/request-hearing/hearing-attendance/hearing-attendance.component';
import {HearingFacilitiesComponent} from './containers/request-hearing/hearing-facilities/hearing-facilities.component';
import {HearingJudgeComponent} from './containers/request-hearing/hearing-judge/hearing-judge.component';
import {HearingPanelComponent} from './containers/request-hearing/hearing-panel/hearing-panel.component';
import {HearingRequirementsComponent} from './containers/request-hearing/hearing-requirements/hearing-requirements.component';
import {HearingStageComponent} from './containers/request-hearing/hearing-stage/hearing-stage.component';
import {HearingTimingComponent} from './containers/request-hearing/hearing-timing/hearing-timing.component';
import {HearingVenueComponent} from './containers/request-hearing/hearing-venue/hearing-venue.component';
import {HearingWelshComponent} from './containers/request-hearing/hearing-welsh/hearing-welsh.component';
import {RequestHearingComponent} from './containers/request-hearing/request-hearing.component';
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
        redirectTo: 'hearing-requirements',
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing'
        }
      },
      {
        path: 'hearing-requirements',
        component: HearingRequirementsComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Hearings | Request Hearing | Hearing Requirement'
        }
      },
      {
        path: 'hearing-facilities',
        component: HearingFacilitiesComponent,
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
        path: 'hearing-attendance',
        component: HearingAttendanceComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Hearings | Request Hearing | How Party Attend'
        }
      },
      {
        path: 'hearing-venue',
        component: HearingVenueComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Hearings | Request Hearing | Location Search'
        }
      },
      {
        path: 'hearing-welsh',
        component: HearingWelshComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Welsh Hearing'
        }
      },
      {
        path: 'hearing-judge',
        component: HearingJudgeComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Specify Judge'
        }
      },
      {
        path: 'hearing-panel',
        component: HearingPanelComponent,
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
        path: 'hearing-additional-instructions',
        component: HearingAdditionalInstructionsComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Additional Instruction'
        }
      },
      {
        path: 'hearing-check-answers',
        component: HearingCheckAnswersComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Check Answers'
        }
      },
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
