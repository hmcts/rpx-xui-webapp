import { PanelPreferenceModel } from './panelPreference.model';

export interface PanelRequirementsModel {
  roleType?: string[];
  authorisationTypes?: string[];
  authorisationSubType?: string[];
  panelPreferences?: PanelPreferenceModel[];
  panelSpecialisms?: string[];
}
