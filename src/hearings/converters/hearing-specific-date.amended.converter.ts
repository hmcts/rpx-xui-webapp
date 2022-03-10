import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../store/reducers';
import {IsAmendedConverter} from './is-amended.converter';

export class HearingSpecificDateAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state => {
      const objAHearingWindow = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.hearingWindow;
      const objBHearingWindow = state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingWindow;

      const objA = objAHearingWindow && objAHearingWindow.hearingWindowDateRange && objAHearingWindow.hearingWindowDateRange.hearingWindowStartDateRange;
      const objB = objBHearingWindow && objBHearingWindow.hearingWindowDateRange && objBHearingWindow.hearingWindowDateRange.hearingWindowStartDateRange;
      return !_.isEqual(objA, objB);
    }));
  }
}
