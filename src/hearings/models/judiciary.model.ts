import { PanelPreferenceModel } from './panelPreference.model';

export interface JudiciaryModel {
  roleType: string[];
  authorisationTypes: string[];
  authorisationSubType: string[];
  panelComposition: [{
    memberType: string;
    count: number;
  }];
  judiciaryPreferences: PanelPreferenceModel[];
  judiciarySpecialisms: string[];
}
