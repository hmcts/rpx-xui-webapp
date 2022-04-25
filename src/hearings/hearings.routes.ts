import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckGuard } from '../app/shared/guards/health-check.guard';
import { ErrorPageComponent } from './components';
import { CancelHearingComponent } from './containers/cancel-hearing/cancel-hearing.component';
import { HearingActualAddEditSummaryComponent } from './containers/hearing-actuals/hearing-actual-add-edit-summary/hearing-actual-add-edit-summary.component';
import { HearingActualsFinalConfirmationComponent } from './containers/hearing-actuals/hearing-actuals-final-confirmation/hearing-actuals-final-confirmation.component';
import { HearingActualsTimingComponent } from './containers/hearing-actuals/hearing-actuals-timing/hearing-actuals-timing.component';
import { HearingActualsViewEditPartiesComponent } from './containers/hearing-actuals/hearing-actuals-view-edit-parties/hearing-actuals-view-edit-parties.component';
import { HearingActualsComponent } from './containers/hearing-actuals/hearing-actuals.component';
import { HearingStageResultComponent } from './containers/hearing-actuals/hearing-stage-result/hearing-stage-result.component';
import { LinkedHearingsWithCaseComponent } from './containers/linked-hearings/linked-hearings-with-case/linked-hearings-with-case.component';
import { LinkedHearingsComponent } from './containers/linked-hearings/linked-hearings.component';
import { HowLinkedHearingsBeHeardComponent } from './containers/linked-hearings/linked-hearings-how-to-heard/linked-hearings-how-to-heard.component';
import { HearingAdditionalInstructionsComponent } from './containers/request-hearing/hearing-additional-instructions/hearing-additional-instructions.component';
import { HearingAttendanceComponent } from './containers/request-hearing/hearing-attendance/hearing-attendance.component';
import { HearingChangeReasonComponent } from './containers/request-hearing/hearing-change-reason/hearing-change-reason.component';
import { HearingCreateEditSummaryComponent } from './containers/request-hearing/hearing-create-edit-summary/hearing-create-edit-summary.component';
import { HearingFacilitiesComponent } from './containers/request-hearing/hearing-facilities/hearing-facilities.component';
import { HearingFinalConfirmationComponent } from './containers/request-hearing/hearing-final-confirmation/hearing-final-confirmation.component';
import { HearingJudgeComponent } from './containers/request-hearing/hearing-judge/hearing-judge.component';
import { HearingLinkComponent } from './containers/request-hearing/hearing-link/hearing-link.component';
import { HearingPanelComponent } from './containers/request-hearing/hearing-panel/hearing-panel.component';
import { HearingRequirementsComponent } from './containers/request-hearing/hearing-requirements/hearing-requirements.component';
import { HearingStageComponent } from './containers/request-hearing/hearing-stage/hearing-stage.component';
import { HearingTimingComponent } from './containers/request-hearing/hearing-timing/hearing-timing.component';
import { HearingVenueComponent } from './containers/request-hearing/hearing-venue/hearing-venue.component';
import { HearingViewEditSummaryComponent } from './containers/request-hearing/hearing-view-edit-summary/hearing-view-edit-summary.component';
import { HearingWelshComponent } from './containers/request-hearing/hearing-welsh/hearing-welsh.component';
import { RequestHearingComponent } from './containers/request-hearing/request-hearing.component';
import { HearingCancellationSummaryComponent } from './containers/view-hearing/hearing-cancellation-summary/hearing-cancellation-summary.component';
import { HearingCancelledSummaryComponent } from './containers/view-hearing/hearing-cancelled-summary/hearing-cancelled-summary.component';
import { HearingCompletedSummaryComponent } from './containers/view-hearing/hearing-completed-summary/hearing-completed-summary.component';
import { HearingRequestFailedSummaryComponent } from './containers/view-hearing/hearing-request-failed-summary/hearing-request-failed-summary.component';
import { HearingViewActualSummaryComponent } from './containers/view-hearing/hearing-view-actual-summary/hearing-view-actual-summary.component';
import { HearingViewSummaryComponent } from './containers/view-hearing/hearing-view-summary/hearing-view-summary.component';
import { ViewHearingComponent } from './containers/view-hearing/view-hearing.component';
import { HearingsEditGuard } from './guards/hearings-edit-guard';
import { HearingsViewGuard } from './guards/hearings-view-guard';
import { HearingCategory, MemberType } from './models/hearings.enum';
import { ActualSummaryResponseResolver } from './resolvers/actual-summary-response-resolver.resolve';
import { AdditionalFacilitiesResolver } from './resolvers/additional-facilities.resolver';
import { AdjournHearingActualReasonResolver } from './resolvers/adjourn-hearing-actual-reason.resolver';
import { CancelHearingActualReasonResolver } from './resolvers/cancel-hearing-actual-reason.resolver';
import { CaseFlagsResolver } from './resolvers/case-flags.resolver';
import { CourtLocationsDataResolver } from './resolvers/court-locations-resolver.resolve';
import { HearingActualPartyChannelResolverService } from './resolvers/hearing-actual-party-channel-resolver.service';
import { HearingActualRoleResolverService } from './resolvers/hearing-actual-role-resolver.service';
import { HearingChangeReasonResolver } from './resolvers/hearing-change-reason.resolver';
import { HearingStageResolver } from './resolvers/hearing-stage.resolver';
import { JudgeTypesResolverService } from './resolvers/judge-types-resolver.service';
import { JudicialUserSearchResolver } from './resolvers/judicial-user-search-resolver.resolve';
import { JudicialUserSearchResponseResolver } from './resolvers/judicial-user-search-response-resolver.resolve';
import { LinkedCaseResolver } from './resolvers/linked-case-resolver.resolve';
import { PanelRolesResolverService } from './resolvers/panel-roles-resolver.service';
import { PartyChannelsResolverService } from './resolvers/party-channels-resolver.service';
import { RefDataResolver } from './resolvers/ref-data-resolver.resolve';
import { LinkedHearingsCheckYourAnswersComponent } from './containers/linked-hearings/linked-hearings-check-your-answers/linked-hearings-check-your-answers.component';
import { LinkedHearingsFinalConfirmationComponent } from './containers/linked-hearings/linked-hearings-final-confirmation/linked-hearings-final-confirmation.component';

export const ROUTES: Routes = [
  {
    path: 'cancel/:hearingId',
    resolve: { hearingCancelOptions: RefDataResolver },
    component: CancelHearingComponent,
    canActivate: [HealthCheckGuard, HearingsEditGuard],
    data: {
      category: HearingCategory.CancelHearingReason
    },
    children: [
      {
        path: '',
        component: null,
        data: {
          title: 'HMCTS Hearings | Cancel Hearing'
        }
      }
    ]
  },
  {
    path: 'link/:caseId/:hearingId',
    component: LinkedHearingsComponent,
    canActivate: [HealthCheckGuard, HearingsEditGuard],
    resolve: { linkedCase: LinkedCaseResolver },
    children: [
      {
        path: '',
        component: LinkedHearingsWithCaseComponent,
        data: {
          title: 'HMCTS Hearings | Linked Hearings | Cases'
        }
      },
      {
        path: 'group-selection',
        component: HowLinkedHearingsBeHeardComponent,
        data: {
          title: 'HMCTS Hearings | Linked Hearings | Group Selection'
        }
      },
      {
        path: 'check-your-answers',
        component: LinkedHearingsCheckYourAnswersComponent,
        data: {
          title: 'HMCTS Hearings | Linked Hearings | Check your answers'
        }
      },
      {
        path: 'final-confirmation',
        component: LinkedHearingsFinalConfirmationComponent,
        data: {
          title: 'HMCTS Hearings | Linked Hearings | Final confirmation'
        }
      }
    ]
  },
  {
    path: 'actuals/:id',
    component: HearingActualsComponent,
    canActivate: [HealthCheckGuard, HearingsEditGuard],
    resolve: {
      partyChannel: HearingActualPartyChannelResolverService,
      hearingRole: HearingActualRoleResolverService,
    },
    data: {
      isChildRequired: [HearingCategory.HearingChannel]
    },
    children: [
      {
        path: 'hearing-actual-add-edit-summary',
        resolve: {
          hearingTypes: RefDataResolver,
          adjournHearingActualReasons: AdjournHearingActualReasonResolver,
          cancelHearingActualReasons: CancelHearingActualReasonResolver
        },
        component: HearingActualAddEditSummaryComponent,
        data: {
          category: HearingCategory.HearingType,
          title: 'HMCTS Hearings | Hearing Actuals | Check details'
        }
      },
      {
        path: 'hearing-timing',
        component: HearingActualsTimingComponent,
        data: {
          title: 'HMCTS Hearings | Hearing Actuals | Hearing Timing'
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
        data: {
          category: HearingCategory.HearingType,
          title: 'HMCTS Hearings | Hearing Actuals | Hearing Stage Result'
        }
      },
      {
        path: 'hearing-actuals-confirmation',
        component: HearingActualsFinalConfirmationComponent,
        data: {
          title: 'HMCTS Hearings | Hearing Actuals | Confirmation'
        }
      },
      {
        path: 'actuals-parties',
        component: HearingActualsViewEditPartiesComponent,
        data: {
          title: 'HMCTS Manage cases | Hearing Actuals | Update Participants'
        }
      },
    ]
  },
  {
    path: 'request',
    component: RequestHearingComponent,
    canActivate: [HealthCheckGuard, HearingsEditGuard],
    children: [
      {
        path: '',
        redirectTo: 'hearing-requirements',
        data: {
          title: 'HMCTS Hearings | Request Hearing'
        }
      },
      {
        path: 'hearing-requirements',
        resolve: { caseFlags: CaseFlagsResolver },
        component: HearingRequirementsComponent,
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
        data: {
          category: HearingCategory.AdditionalFacilities,
          title: 'HMCTS Hearings | Request Hearing | Additional Facilities'
        }
      },
      {
        path: 'hearing-stage',
        resolve: { hearingStages: RefDataResolver },
        component: HearingStageComponent,
        data: {
          title: 'HMCTS Hearings | Request Hearing | Hearing Stage',
          category: HearingCategory.HearingType
        }
      },
      {
        path: 'hearing-attendance',
        component: HearingAttendanceComponent,
        data: {
          title: 'HMCTS Hearings | Request Hearing | How Party Attend'
        }
      },
      {
        path: 'hearing-venue',
        component: HearingVenueComponent,
        data: {
          title: 'HMCTS Hearings | Request Hearing | Location Search'
        }
      },
      {
        path: 'hearing-welsh',
        component: HearingWelshComponent,
        data: {
          title: 'HMCTS Hearings | Request Hearing | Welsh Hearing'
        }
      },
      {
        path: 'hearing-judge',
        resolve: {
          hearingStages: RefDataResolver,
          judicialUsers: JudicialUserSearchResolver
        },
        component: HearingJudgeComponent,
        data: {
          title: 'HMCTS Hearings | Request Hearing | Specify Judge',
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
        data: {
          title: 'HMCTS Hearings | Request Hearing | Require Panel Or Not',
          category: HearingCategory.PanelMemberType,
          memberType: MemberType.PANEL_MEMBER,
          isChildRequired: [HearingCategory.PanelMemberType]
        }
      },
      {
        path: 'hearing-timing',
        resolve: { hearingPriorities: RefDataResolver },
        component: HearingTimingComponent,
        data: {
          title: 'HMCTS Hearings | Request Hearing | Hearing Timing',
          category: HearingCategory.HearingPriority
        }
      },
      {
        path: 'hearing-link',
        component: HearingLinkComponent,
        data: {
          title: 'HMCTS Hearings | Request Hearing | Hearing Link'
        }
      },
      {
        path: 'hearing-additional-instructions',
        component: HearingAdditionalInstructionsComponent,
        data: {
          title: 'HMCTS Hearings | Request Hearing | Additional Instruction'
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
          judicialUsers: JudicialUserSearchResolver,
          otherPanelRoles: PanelRolesResolverService,
        },
        component: HearingCreateEditSummaryComponent,
        data: {
          title: 'HMCTS Hearings | Request Hearing | Check Answers',
          isChildRequired: [HearingCategory.PanelMemberType]
        }
      },
      {
        path: 'hearing-view-edit-summary',
        resolve: {
          hearingPriorities: RefDataResolver,
          caseFlags: CaseFlagsResolver,
          hearingStageOptions: HearingStageResolver,
          additionFacilitiesOptions: AdditionalFacilitiesResolver,
          partyChannels: PartyChannelsResolverService,
          judgeTypes: JudgeTypesResolverService,
          judicialUsers: JudicialUserSearchResolver,
          judicialResponseUsers: JudicialUserSearchResponseResolver,
          otherPanelRoles: PanelRolesResolverService,
          courtLocation: CourtLocationsDataResolver,
        },
        component: HearingViewEditSummaryComponent,
        data: {
          title: 'HMCTS Hearings | Amend Hearing | Check Answers',
          isChildRequired: [HearingCategory.PanelMemberType]
        }
      },
      {
        path: 'hearing-change-reason',
        resolve: {
          hearingTypes: RefDataResolver,
          hearingChangeReason: HearingChangeReasonResolver
        },
        component: HearingChangeReasonComponent,
        data: {
          title: 'HMCTS Hearings | Amend Hearing | Change reason'
        }
      },
      {
        path: 'hearing-confirmation',
        component: HearingFinalConfirmationComponent,
        data: {
          title: 'HMCTS Hearings | Request Amend Hearing | Confirmation'
        }
      }
    ]
  },
  {
    path: 'view',
    component: ViewHearingComponent,
    canActivate: [HealthCheckGuard, HearingsViewGuard],
    children: [
      {
        path: '',
        component: null,
        data: {
          title: 'HMCTS Hearings | View Hearing'
        }
      },
      {
        path: 'hearing-view-summary',
        resolve: {
          hearingPriorities: RefDataResolver,
          caseFlags: CaseFlagsResolver,
          hearingStageOptions: HearingStageResolver,
          additionFacilitiesOptions: AdditionalFacilitiesResolver,
          partyChannels: PartyChannelsResolverService,
          judgeTypes: JudgeTypesResolverService,
          judicialUsers: JudicialUserSearchResolver,
          judicialResponseUsers: JudicialUserSearchResponseResolver,
          otherPanelRoles: PanelRolesResolverService,
          courtLocation: CourtLocationsDataResolver,
        },
        component: HearingViewSummaryComponent,
        data: {
          title: 'HMCTS Hearings | View Hearing | Summary',
          isChildRequired: [HearingCategory.PanelMemberType]
        }
      },
      {
        path: 'hearing-cancellation-summary',
        resolve: {
          hearingPriorities: RefDataResolver,
          caseFlags: CaseFlagsResolver,
          hearingStageOptions: HearingStageResolver,
          additionFacilitiesOptions: AdditionalFacilitiesResolver,
          partyChannels: PartyChannelsResolverService,
          judgeTypes: JudgeTypesResolverService,
          judicialUsers: JudicialUserSearchResolver,
          judicialResponseUsers: JudicialUserSearchResponseResolver,
          otherPanelRoles: PanelRolesResolverService,
          courtLocation: CourtLocationsDataResolver,
        },
        component: HearingCancellationSummaryComponent,
        data: {
          title: 'HMCTS Hearings | View Hearing | Cancellation summary'
        }
      },
      {
        path: 'hearing-cancelled-summary',
        resolve: {
          hearingPriorities: RefDataResolver,
          caseFlags: CaseFlagsResolver,
          hearingStageOptions: HearingStageResolver,
          additionFacilitiesOptions: AdditionalFacilitiesResolver,
          partyChannels: PartyChannelsResolverService,
          judgeTypes: JudgeTypesResolverService,
          judicialUsers: JudicialUserSearchResolver,
          judicialResponseUsers: JudicialUserSearchResponseResolver,
          otherPanelRoles: PanelRolesResolverService,
          courtLocation: CourtLocationsDataResolver,
        },
        component: HearingCancelledSummaryComponent,
        data: {
          title: 'HMCTS Hearings | View Hearing | Cancelled Summary'
        }
      },
      {
        path: 'hearing-completed-summary/:id',
        resolve: {
          actualSummary: ActualSummaryResponseResolver,
          hearingStageOptions: HearingStageResolver,
          judicialResponseUsers: JudicialUserSearchResponseResolver,
          courtLocation: CourtLocationsDataResolver,
          partyChannels: HearingActualPartyChannelResolverService,
        },
        component: HearingCompletedSummaryComponent,
        data: {
          title: 'HMCTS Hearings | Hearing Actuals | Completed',
          isChildRequired: [HearingCategory.HearingChannel]
        }
      },
      {
        path: 'hearing-adjourned-summary/:id',
        resolve: {
          actualSummary: ActualSummaryResponseResolver,
          hearingStageOptions: HearingStageResolver,
          judicialResponseUsers: JudicialUserSearchResponseResolver,
          courtLocation: CourtLocationsDataResolver,
          partyChannels: HearingActualPartyChannelResolverService,
        },
        component: HearingCompletedSummaryComponent,
        data: {
          title: 'HMCTS Hearings | Hearing Actuals | Adjourned',
          isChildRequired: [HearingCategory.HearingChannel]
        }
      },
      {
        path: 'hearing-view-actuals-summary/:id',
        resolve: {
          actualSummary: ActualSummaryResponseResolver,
          hearingStageOptions: HearingStageResolver,
          judicialResponseUsers: JudicialUserSearchResponseResolver,
          courtLocation: CourtLocationsDataResolver,
          partyChannels: HearingActualPartyChannelResolverService,
        },
        component: HearingViewActualSummaryComponent,
        data: {
          title: 'HMCTS Hearings | Hearing Actuals | Awaiting',
          isChildRequired: [HearingCategory.HearingChannel]
        }
      },
      {
        path: 'hearing-request-failed-summary/:id',
        resolve: {
          hearingStageOptions: HearingStageResolver,
          judicialResponseUsers: JudicialUserSearchResponseResolver,
          courtLocation: CourtLocationsDataResolver,
          partyChannels: HearingActualPartyChannelResolverService,
        },
        component: HearingRequestFailedSummaryComponent,
        data: {
          title: 'HMCTS Hearings | View Hearing | Request failed '
        }
      },
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    canActivate: [HealthCheckGuard, HearingsViewGuard],
    data: {
      title: 'HMCTS Hearings | System Error'
    }
  }
];

export const hearingsRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
