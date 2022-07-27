import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberType } from '../models/hearings.enum';
import { State } from '../store/reducers';
import { IsAmendedConverter } from './is-amended.converter';

export class PanelRolesAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state => {

      const hearingComparePanelRequirements = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements;
      const comparedPanelSpecialisms: string[] = hearingComparePanelRequirements && hearingComparePanelRequirements.panelSpecialisms && hearingComparePanelRequirements.panelSpecialisms;

      const hearingRequestPanelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
      const requestedPanelSpecialisms: string[] = hearingRequestPanelRequirements && hearingRequestPanelRequirements.panelSpecialisms && hearingRequestPanelRequirements.panelSpecialisms;

      return !_.isEqual(comparedPanelSpecialisms, requestedPanelSpecialisms);
    }));
  }
}
