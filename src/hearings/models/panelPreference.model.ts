import {RequirementType} from './hearings.enum';

export interface PanelPreferenceModel {
  memberID: string;
  memberType?: string;
  requirementType: RequirementType;
}
