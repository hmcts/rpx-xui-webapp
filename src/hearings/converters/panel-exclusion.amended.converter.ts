import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberType, RequirementType } from '../models/hearings.enum';
import { PanelPreferenceModel } from '../models/panelPreference.model';
import { State } from '../store/reducers';
import { IsAmendedConverter } from './is-amended.converter';

export class PanelExclusionAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      const hearingComparePanelRequirements = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements;
      const comparedPanelMembers: PanelPreferenceModel[] = hearingComparePanelRequirements && hearingComparePanelRequirements.panelPreferences && hearingComparePanelRequirements.panelPreferences.filter((preferences) => preferences.memberType === MemberType.PANEL_MEMBER && preferences.requirementType === RequirementType.EXCLUDE);

      const hearingRequestPanelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
      const requestedPanelMembers: PanelPreferenceModel[] = hearingRequestPanelRequirements && hearingRequestPanelRequirements.panelPreferences && hearingRequestPanelRequirements.panelPreferences.filter((preferences) => preferences.memberType === MemberType.PANEL_MEMBER && preferences.requirementType === RequirementType.EXCLUDE);

      return !_.isEqual(comparedPanelMembers, requestedPanelMembers);
    }));
  }
}
