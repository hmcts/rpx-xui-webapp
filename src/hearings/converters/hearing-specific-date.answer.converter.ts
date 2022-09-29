import moment from 'moment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HearingDateEnum, RadioOptions} from '../models/hearings.enum';
import {State} from '../store';
import {AnswerConverter} from './answer.converter';

export class HearingSpecificDateAnswerConverter implements AnswerConverter {

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => this.createAnswer(state))
    );
  }

  private createAnswer(state: State): string {
    let specificDateSelection: string = '';
    let earliestHearingDate: string = '';
    let latestHearingDate: string = '';
    const hearingWindow = state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingWindow;

    if (hearingWindow && (hearingWindow.dateRangeStart || hearingWindow.dateRangeEnd)) {
      specificDateSelection = RadioOptions.CHOOSE_DATE_RANGE;
      earliestHearingDate = moment(hearingWindow.dateRangeStart).format(HearingDateEnum.DisplayMonth);
      latestHearingDate = hearingWindow.dateRangeEnd && moment(hearingWindow.dateRangeEnd).format(HearingDateEnum.DisplayMonth);
      specificDateSelection += earliestHearingDate !== HearingDateEnum.InvalidDate ? `<dt class="heading-h3 bottom-0">Earliest hearing date</dt>${earliestHearingDate}` : '';
      specificDateSelection += latestHearingDate && latestHearingDate !== HearingDateEnum.InvalidDate ? `<dt class="heading-h3 bottom-0">Latest hearing date</dt>${latestHearingDate}` : '';
    } else if (hearingWindow && hearingWindow.firstDateTimeMustBe) {
      specificDateSelection = RadioOptions.YES;
      const firstDate = moment(hearingWindow.firstDateTimeMustBe).format(HearingDateEnum.DisplayMonth);
      specificDateSelection += firstDate !== HearingDateEnum.InvalidDate ? `<dt class="heading-h3 bottom-0">The first date of the hearing must be</dt>${firstDate}` : '';
    } else if (hearingWindow === null) {
      specificDateSelection = RadioOptions.NO;
    }

    return specificDateSelection;
  }
}
