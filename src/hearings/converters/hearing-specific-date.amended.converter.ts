import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../store/reducers';
import {IsAmendedConverter} from './is-amended.converter';

export class HearingSpecificDateAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state => {
      const ObjAHearingWindow = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.hearingWindow;
      const ObBHearingWindow = state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingWindow;

      const objA = ObjAHearingWindow && ObjAHearingWindow.hearingWindowDateRange && ObjAHearingWindow.hearingWindowDateRange.hearingWindowStartDateRange;
      const objB = ObBHearingWindow && ObBHearingWindow.hearingWindowDateRange && ObBHearingWindow.hearingWindowDateRange.hearingWindowStartDateRange;
      return !_.isEqual(objA, objB);
    }));
  }
}
