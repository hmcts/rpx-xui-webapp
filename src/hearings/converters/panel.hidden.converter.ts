import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { MemberType } from '../models/hearings.enum';
import {State} from '../store';
import {HiddenConverter} from './hidden.converter';

export class PanelFieldsHiddenConverter implements HiddenConverter {

  public transformHidden(hearingState$: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state =>
      !state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements ||
      (state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements.panelPreferences &&
      state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements.panelPreferences.filter(ref => ref.memberType === MemberType.PANEL_MEMBER).length === 0)
    ));
  }
}
