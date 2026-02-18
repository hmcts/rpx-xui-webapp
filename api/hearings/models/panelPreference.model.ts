import { MemberType, RequirementType } from './hearings.enum';

export interface PanelPreferenceModel {
  memberID: string;
  memberType?: MemberType;
  requirementType: RequirementType;
}
