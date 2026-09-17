import { EXUIDisplayStatusEnum, EXUISectionStatusEnum, HMCStatus } from './hearings.enum';
import { HearingStatusMapping } from './hearingStatusMapping';

export type HearingStatusMappings = Partial<Record<HMCStatus, HearingStatusMapping>>;

export const hearingStatusMappings: HearingStatusMappings = {
  [HMCStatus.HEARING_REQUESTED]: {
    hmcStatus: HMCStatus.HEARING_REQUESTED,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.AWAITING_LISTING,
  },
  [HMCStatus.AWAITING_LISTING]: {
    hmcStatus: HMCStatus.AWAITING_LISTING,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.AWAITING_LISTING,
  },
  [HMCStatus.LISTED]: {
    hmcStatus: HMCStatus.LISTED,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.LISTED,
  },
  [HMCStatus.UPDATE_REQUESTED]: {
    hmcStatus: HMCStatus.UPDATE_REQUESTED,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.UPDATE_REQUESTED,
  },
  [HMCStatus.UPDATE_SUBMITTED]: {
    hmcStatus: HMCStatus.UPDATE_SUBMITTED,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.UPDATE_REQUESTED,
  },
  [HMCStatus.EXCEPTION]: {
    hmcStatus: HMCStatus.EXCEPTION,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.FAILURE,
  },
  [HMCStatus.CANCELLATION_REQUESTED]: {
    hmcStatus: HMCStatus.CANCELLATION_REQUESTED,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.CANCELLATION_REQUESTED,
  },
  [HMCStatus.CANCELLATION_SUBMITTED]: {
    hmcStatus: HMCStatus.CANCELLATION_SUBMITTED,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.CANCELLATION_SUBMITTED,
  },
  [HMCStatus.AWAITING_ACTUALS]: {
    hmcStatus: HMCStatus.AWAITING_ACTUALS,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.AWAITING_ACTUALS,
  },
  [HMCStatus.CANCELLED]: {
    hmcStatus: HMCStatus.CANCELLED,
    exuiSectionStatus: EXUISectionStatusEnum.PAST_OR_CANCELLED,
    exuiDisplayStatus: EXUIDisplayStatusEnum.CANCELLED,
  },
  [HMCStatus.COMPLETED]: {
    hmcStatus: HMCStatus.COMPLETED,
    exuiSectionStatus: EXUISectionStatusEnum.PAST_OR_CANCELLED,
    exuiDisplayStatus: EXUIDisplayStatusEnum.COMPLETED,
  },
  [HMCStatus.ADJOURNED]: {
    hmcStatus: HMCStatus.ADJOURNED,
    exuiSectionStatus: EXUISectionStatusEnum.PAST_OR_CANCELLED,
    exuiDisplayStatus: EXUIDisplayStatusEnum.ADJOURNED,
  },
};
