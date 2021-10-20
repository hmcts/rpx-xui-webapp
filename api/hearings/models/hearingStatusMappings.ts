import { HearingListingStatusEnum, HearingsSectionStatusEnum, HMCStatus } from "./hearings.enum";
import { HearingStatusMapping } from "./hearingStatusMapping";

export const hearingStatusMappings: HearingStatusMapping[] = [
    {
      hearingListingStatus : HearingListingStatusEnum.WAITING_TO_BE_LISTED,
      hearingsSectionStatus : HearingsSectionStatusEnum.UPCOMING,
      hmcStatus : HMCStatus.hearingRequestd,
    },
    {
      hearingListingStatus : HearingListingStatusEnum.WAITING_TO_BE_LISTED,
      hearingsSectionStatus : HearingsSectionStatusEnum.UPCOMING,
      hmcStatus : HMCStatus.awaitingListing,
    },
    {
      hearingListingStatus : HearingListingStatusEnum.WAITING_TO_BE_LISTED,
      hearingsSectionStatus : HearingsSectionStatusEnum.UPCOMING,
      hmcStatus : HMCStatus.listed,
    },
    {
      hearingListingStatus : HearingListingStatusEnum.WAITING_TO_BE_LISTED,
      hearingsSectionStatus : HearingsSectionStatusEnum.UPCOMING,
      hmcStatus : HMCStatus.updateRequested,
    },
    {
      hearingListingStatus : HearingListingStatusEnum.UPDATE_REQUESTED,
      hearingsSectionStatus : HearingsSectionStatusEnum.UPCOMING,
      hmcStatus : HMCStatus.updateSubmitted,
    },
    {
      hearingListingStatus : HearingListingStatusEnum.EXCEPTION,
      hearingsSectionStatus : HearingsSectionStatusEnum.UPCOMING,
      hmcStatus : HMCStatus.exception,
    },
    {
      hearingListingStatus : HearingListingStatusEnum.CANCELLATION_REQUESTED,
      hearingsSectionStatus : HearingsSectionStatusEnum.UPCOMING,
      hmcStatus : HMCStatus.cancellationRequested,
    },
    {
      hearingListingStatus : HearingListingStatusEnum.VACATED,
      hearingsSectionStatus : HearingsSectionStatusEnum.PAST_AND_CANCELLED,
      hmcStatus : HMCStatus.vacated,
    },
    {
      hearingListingStatus : HearingListingStatusEnum.AWAITING_ACTUALS,
      hearingsSectionStatus : HearingsSectionStatusEnum.PAST_AND_CANCELLED,
      hmcStatus : HMCStatus.awaitingActuals,
    },
    {
      hearingListingStatus : HearingListingStatusEnum.COMPLETED,
      hearingsSectionStatus : HearingsSectionStatusEnum.PAST_AND_CANCELLED,
      hmcStatus : HMCStatus.completed,
    },
    {
      hearingListingStatus : HearingListingStatusEnum.ADJOURNED,
      hearingsSectionStatus : HearingsSectionStatusEnum.PAST_AND_CANCELLED,
      hmcStatus : HMCStatus.adjourned,
    },
  ];
