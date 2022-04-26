import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../store/reducers';
import {IsAmendedConverter} from './is-amended.converter';
import * as moment from 'moment';

export class HearingSpecificDateAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state => {
      const objAHearingWindow = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.hearingWindow;
      const objBHearingWindow = state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingWindow;

      const objA = objAHearingWindow && objAHearingWindow.dateRangeStart;
      const objB = objBHearingWindow && objBHearingWindow.dateRangeStart;
      return !moment(new Date(objA).toDateString()).isSame(moment(new Date(objB).toDateString()).toDate());
    }));
  }
}
