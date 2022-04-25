import * as moment from 'moment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HearingDateEnum, RadioOptions} from '../models/hearings.enum';
import {State} from '../store';
import {AnswerConverter} from './answer.converter';

export class HearingSpecificDateAnswerConverter implements AnswerConverter {

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        let specificDateSelection: string = '';
        const hearingWindow = state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingWindow;
        if (hearingWindow && hearingWindow.dateRangeStart && hearingWindow.dateRangeEnd) {
          specificDateSelection = RadioOptions.CHOOSE_DATE_RANGE;
          const earliestHearing = moment(hearingWindow.dateRangeStart).format(HearingDateEnum.DisplayMonth);
          const latestHearing = moment(hearingWindow.dateRangeEnd).format(HearingDateEnum.DisplayMonth);
          specificDateSelection += earliestHearing !== HearingDateEnum.InvalidDate ? `<dt class="heading-h3 bottom-0">Earliest hearing date</dt>${earliestHearing}` : '';
          specificDateSelection += latestHearing !== HearingDateEnum.InvalidDate ? `<dt class="heading-h3 bottom-0">Latest hearing date</dt>${latestHearing}` : '';
        } else if (hearingWindow && hearingWindow.dateRangeStart && !hearingWindow.dateRangeEnd) {
          specificDateSelection = RadioOptions.YES;
          const firstDate = moment(hearingWindow.dateRangeStart).format(HearingDateEnum.DisplayMonth);
          specificDateSelection += firstDate !== HearingDateEnum.InvalidDate ? `<dt class="heading-h3 bottom-0">The first date of the hearing must be</dt>${firstDate}` : '';
        } else if (hearingWindow) {
          specificDateSelection = RadioOptions.NO;
        }
        return specificDateSelection;
      })
    );
  }
}
