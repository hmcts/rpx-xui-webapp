import { EXUIDisplayStatusEnum, EXUISectionStatusEnum, HMCStatus } from './hearings.enum';

export class HearingStatusMapping {
  public hmcStatus: HMCStatus;
  public exuiSectionStatus: EXUISectionStatusEnum;
  public exuiDisplayStatus: EXUIDisplayStatusEnum;
}
