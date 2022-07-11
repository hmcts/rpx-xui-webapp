import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class HearingResponseLengthAnswerConverter implements AnswerConverter {

  public transformAnswer(hearingState$: Observable<State>, index: number): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        const hearingSchedule = state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[index] || null;
        const startTime = moment(hearingSchedule && hearingSchedule.hearingStartDateTime);
        const endTime = moment(hearingSchedule && hearingSchedule.hearingEndDateTime);
        const duration: number = moment.duration(endTime.diff(startTime)).asMinutes();
        return this.calculateFormattedHearingLength(duration);
      })
    );
  }

  public calculateFormattedHearingLength(duration: number): string {
    let days = 0;
    let hours = 0;
    let minutes = 0;
    if (duration && duration > 0) {
      minutes = duration % 60;
      duration = duration - minutes;
      days = Math.floor((duration / 60) / 6);
      hours = Math.floor((duration / 60) % 6);
      let formattedHearingLength = '';
      if (days > 0) {
        const daysLabel = days > 1 ? 'Days' : 'Day';
        formattedHearingLength = `${days} ${daysLabel}`;
      }
      if (hours > 0) {
        const hoursLabel = hours > 1 ? 'Hours' : 'Hour';
        formattedHearingLength = formattedHearingLength.length > 0 ? `${formattedHearingLength} ${hours} ${hoursLabel}` : `${hours} ${hoursLabel}`;
      }
      if (minutes > 0) {
        const minutesLabel = 'Minutes';
        formattedHearingLength = formattedHearingLength.length > 0 ? `${formattedHearingLength} ${minutes} ${minutesLabel}` : `${minutes} ${minutesLabel}`;
      }
      if (formattedHearingLength.length > 0) {
        return formattedHearingLength;
      }
    }
    return '';
  }
}
