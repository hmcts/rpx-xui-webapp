import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store';
import { HiddenConverter } from './hidden.converter';
import { MemberType } from '../models/hearings.enum';

export class PanelRolesHiddenConverter implements HiddenConverter {
  public transformHidden(hearingState$: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      const panelRequirements = state.hearingConditions?.isHearingAmendmentsEnabled
        ? state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements
        : state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;

      if (panelRequirements?.panelSpecialisms || panelRequirements?.roleType || panelRequirements?.panelPreferences) {
        const panelSpecialisms: number = panelRequirements?.panelSpecialisms?.length || 0;
        const roleTypes: number = panelRequirements?.roleType?.length || 0;
        const panelMembers: number = panelRequirements?.panelPreferences?.filter((preferences) => preferences.memberType === MemberType.PANEL_MEMBER).length || 0;
        return !(panelSpecialisms > 0 || roleTypes > 0 || panelMembers > 0);
      }
      return true;
    }
    ));
  }
}
