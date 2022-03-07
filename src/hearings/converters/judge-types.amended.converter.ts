import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../store/reducers';
import {IsAmendedConverter} from './is-amended.converter';

export class JudgeTypesAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state => {
      const ObjAPanelRequirements = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements
      const ObjBPanelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements
      const objA = ObjAPanelRequirements && ObjAPanelRequirements.roleType
      const objB = ObjBPanelRequirements && ObjBPanelRequirements.roleType;
      return !_.isEqual(objA, objB);
    }));
  }
}
