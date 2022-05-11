import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberType, RequirementType } from '../models/hearings.enum';
import { State } from '../store/reducers';
import { IsAmendedConverter } from './is-amended.converter';

export class PanelInclusionAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state => {

      const hearingComparePanelRequirements = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements;
      const comparedPanelMembers = hearingComparePanelRequirements && hearingComparePanelRequirements.panelPreferences && hearingComparePanelRequirements.panelPreferences.filter(preferences => preferences.memberType === MemberType.PANEL_MEMBER && preferences.requirementType === RequirementType.MUSTINC);

      const hearingRequestPanelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
      const requestedPanelMembers = hearingRequestPanelRequirements && hearingRequestPanelRequirements.panelPreferences && hearingRequestPanelRequirements.panelPreferences.filter(preferences => preferences.memberType === MemberType.PANEL_MEMBER && preferences.requirementType === RequirementType.MUSTINC);

      return !_.isEqual(comparedPanelMembers, requestedPanelMembers);
    }));
  }
}
