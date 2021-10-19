import { HearingListingStatusEnum, HearingsSectionStatusEnum, HMCStatus } from "./hearings.enum";
import { HearingStatusMapping } from "./hearingStatusMapping";

export const hearingStatusMappings: HearingStatusMapping[] = [
    {
      hmcStatus : HMCStatus.hearingRequestd,
      hearingsSectionStatus : HearingsSectionStatusEnum.UPCOMING,
      hearingListingStatus : HearingListingStatusEnum.WAITING_TO_BE_LISTED
    },
    {
      hmcStatus : HMCStatus.awaitingListing,
      hearingsSectionStatus : HearingsSectionStatusEnum.UPCOMING,
      hearingListingStatus : HearingListingStatusEnum.WAITING_TO_BE_LISTED
    },
    {
      hmcStatus : HMCStatus.listed,
      hearingsSectionStatus : HearingsSectionStatusEnum.UPCOMING,
      hearingListingStatus : HearingListingStatusEnum.LISTED
    },
    {
      hmcStatus : HMCStatus.updateRequested,
      hearingsSectionStatus : HearingsSectionStatusEnum.UPCOMING,
      hearingListingStatus : HearingListingStatusEnum.UPDATE_REQUESTED
    },
    {
      hmcStatus : HMCStatus.updateSubmitted,
      hearingsSectionStatus : HearingsSectionStatusEnum.UPCOMING,
      hearingListingStatus : HearingListingStatusEnum.UPDATE_REQUESTED
    },
    {
      hmcStatus : HMCStatus.exception,
      hearingsSectionStatus : HearingsSectionStatusEnum.UPCOMING,
      hearingListingStatus : HearingListingStatusEnum.EXCEPTION
    },
    {
      hmcStatus : HMCStatus.cancellationRequested,
      hearingsSectionStatus : HearingsSectionStatusEnum.UPCOMING,
      hearingListingStatus : HearingListingStatusEnum.CANCELLATION_REQUESTED
    },
    {
      hmcStatus : HMCStatus.vacated,
      hearingsSectionStatus : HearingsSectionStatusEnum.PAST_AND_CANCELLED,
      hearingListingStatus : HearingListingStatusEnum.VACATED
    },
    {
      hmcStatus : HMCStatus.awaitingActuals,
      hearingsSectionStatus : HearingsSectionStatusEnum.PAST_AND_CANCELLED,
      hearingListingStatus : HearingListingStatusEnum.AWAITING_ACTUALS
    },
    {
      hmcStatus : HMCStatus.completed,
      hearingsSectionStatus : HearingsSectionStatusEnum.PAST_AND_CANCELLED,
      hearingListingStatus : HearingListingStatusEnum.COMPLETED
    },
    {
      hmcStatus : HMCStatus.adjourned,
      hearingsSectionStatus : HearingsSectionStatusEnum.PAST_AND_CANCELLED,
      hearingListingStatus : HearingListingStatusEnum.ADJOURNED
    },
  ];
  