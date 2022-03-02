import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { CancelHearingComponent } from './containers/cancel-hearing/cancel-hearing.component';
import { ChangeHearingComponent } from './containers/change-hearing/change-hearing.component';
import { HearingActualAddEditSummaryComponent } from './containers/hearing-actuals/hearing-actual-add-edit-summary/hearing-actual-add-edit-summary.component';
import { HearingActualsComponent } from './containers/hearing-actuals/hearing-actuals.component';
import { HearingStageResultComponent } from './containers/hearing-actuals/hearing-stage-result/hearing-stage-result.component';
import { HearingAdditionalInstructionsComponent } from './containers/request-hearing/hearing-additional-instructions/hearing-additional-instructions.component';
import { HearingAttendanceComponent } from './containers/request-hearing/hearing-attendance/hearing-attendance.component';
import { HearingCreateEditSummaryComponent } from './containers/request-hearing/hearing-create-edit-summary/hearing-create-edit-summary.component';
import { HearingFacilitiesComponent } from './containers/request-hearing/hearing-facilities/hearing-facilities.component';
import { HearingFinalConfirmationComponent } from './containers/request-hearing/hearing-final-confirmation/hearing-final-confirmation.component';
import { HearingJudgeComponent } from './containers/request-hearing/hearing-judge/hearing-judge.component';
import { HearingPanelComponent } from './containers/request-hearing/hearing-panel/hearing-panel.component';
import { HearingRequirementsComponent } from './containers/request-hearing/hearing-requirements/hearing-requirements.component';
import { HearingStageComponent } from './containers/request-hearing/hearing-stage/hearing-stage.component';
import { HearingTimingComponent } from './containers/request-hearing/hearing-timing/hearing-timing.component';
import { HearingVenueComponent } from './containers/request-hearing/hearing-venue/hearing-venue.component';
import { HearingViewEditSummaryComponent } from './containers/request-hearing/hearing-view-edit-summary/hearing-view-edit-summary.component';
import { HearingWelshComponent } from './containers/request-hearing/hearing-welsh/hearing-welsh.component';
import { RequestHearingComponent } from './containers/request-hearing/request-hearing.component';
import { ViewHearingComponent } from './containers/view-hearing/view-hearing.component';
import { HearingCategory, MemberType } from './models/hearings.enum';
import { JudicialUserSearchResolver } from './resolvers/ judicial-user-search-resolver.resolve';
import { AdditionalFacilitiesResolver } from './resolvers/additional-facilities.resolver';
import { AdjournHearingActualReasonResolver } from './resolvers/adjourn-hearing-actual-reason.resolver';
import { CancelHearingActualReasonResolver } from './resolvers/cancel-hearing-actual-reason.resolver';
import { CaseFlagsResolver } from './resolvers/case-flags.resolver';
import { HearingStageResolver } from './resolvers/hearing-stage.resolver';
import { JudgeTypesResolverService } from './resolvers/judge-types-resolver.service';
import { PartyChannelsResolverService } from './resolvers/party-channels-resolver.service';
import { RefDataResolver } from './resolvers/ref-data-resolver.resolve';

export const ROUTES: Routes = [
  {
    path: 'cancel/:hearingId',
    resolve: { hearingCancelOptions: RefDataResolver },
    component: CancelHearingComponent,
    data: {
      category: HearingCategory.CancelHearingReason
    },
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
    path: 'actuals',
    component: HearingActualsComponent,
    children: [
      {
        path: 'hearing-actual-add-edit-summary',
        resolve: {
          adjournHearingActualReasons: AdjournHearingActualReasonResolver,
          cancelHearingActualReasons: CancelHearingActualReasonResolver
        },    
        component: HearingActualAddEditSummaryComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Hearing Actuals | Check details'
        }
      },
      {
        path: 'hearing-stage-result',
        resolve: {
          hearingTypes: RefDataResolver,
          adjournHearingActualReasons: AdjournHearingActualReasonResolver,
          cancelHearingActualReasons: CancelHearingActualReasonResolver
        },
        component: HearingStageResultComponent,
        canActivate: [HealthCheckGuard],
        data: {
          category: HearingCategory.HearingType,
          title: 'HMCTS Hearings | Request Hearing | Hearing Stage Result'
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
        resolve: { caseFlags: CaseFlagsResolver },
        component: HearingRequirementsComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Hearings | Request Hearing | Hearing Requirement'
        }
      },
      {
        path: 'hearing-facilities',
        resolve: {
          caseFlags: CaseFlagsResolver,
          additionFacilitiesOptions: RefDataResolver
        },
        component: HearingFacilitiesComponent,
        canActivate: [HealthCheckGuard],
        data: {
          category: HearingCategory.FacilitiesList,
          title: 'HMCTS Hearings | Request Hearing | Additional Facilities'
        }
      },
      {
        path: 'hearing-stage',
        resolve: { hearingStages: RefDataResolver },
        component: HearingStageComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Hearings | Request Hearing | Hearing Stage',
          category: HearingCategory.HearingType
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
        resolve: {
          hearingStages: RefDataResolver,
          judicialUsers: JudicialUserSearchResolver
        },
        component: HearingJudgeComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Specify Judge',
          category: HearingCategory.JudgeType,
          memberType: MemberType.JUDGE
        }
      },
      {
        path: 'hearing-panel',
        resolve: {
          otherPanelRoles: RefDataResolver,
          judicialUsers: JudicialUserSearchResolver
        },
        component: HearingPanelComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Require Panel Or Not',
          category: HearingCategory.OtherPanelRoles,
          memberType: MemberType.PANEL_MEMBER
        }
      },
      {
        path: 'hearing-timing',
        resolve: { hearingPriorities: RefDataResolver },
        component: HearingTimingComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Hearing Timing',
          category: HearingCategory.Priority
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
        path: 'hearing-create-edit-summary',
        resolve: {
          hearingPriorities: RefDataResolver,
          caseFlags: CaseFlagsResolver,
          hearingStageOptions: HearingStageResolver,
          additionFacilitiesOptions: AdditionalFacilitiesResolver,
          partyChannels: PartyChannelsResolverService,
          judgeTypes: JudgeTypesResolverService,
          judicialUsers: JudicialUserSearchResolver
        },
        component: HearingCreateEditSummaryComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Check Answers'
        }
      },
      {
        path: 'hearing-view-edit-summary',
        component: HearingViewEditSummaryComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Amend Hearing | Check Answers'
        }
      },
      {
        path: 'hearing-actual-add-edit',
        component: HearingActualAddEditSummaryComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Amend Hearing | Check Answers'
        }
      },
      {
        path: 'hearing-confirmation',
        component: HearingFinalConfirmationComponent,
        canActivate: [HealthCheckGuard],
        data: {
          title: 'HMCTS Manage cases | Request Hearing | Confirmation'
        }
      }
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
