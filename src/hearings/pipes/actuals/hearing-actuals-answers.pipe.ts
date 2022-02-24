import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { State } from '../../store';
import { Observable } from 'rxjs';
import { HearingActualsAnswerSource } from '../../models/hearings.enum';
import { AnswerConverter } from '../../converters/actuals/answer.converter';
import { DefaultAnswerConverter } from '../../converters/default.answer.converter';
import { HearingDateAnswerConverter } from '../../converters/actuals/hearing-date.answer.converter';

@Pipe({
  name: 'transformAnswer'
})
export class HearingActualsAnswersPipe implements PipeTransform {

  constructor(protected readonly route: ActivatedRoute) {
  }

  public transform(answerSource: HearingActualsAnswerSource, hearingActuals$: Observable<State>): Observable<string> {
    let converter: AnswerConverter = new DefaultAnswerConverter();
    switch (answerSource) {
      case HearingActualsAnswerSource.HEARING_DATE:
        converter = new HearingDateAnswerConverter();
        break;
      case HearingActualsAnswerSource.HEARING_TYPE:
        converter = new HearingDateAnswerConverter();
        break;
      case HearingActualsAnswerSource.HEARING_RESULT:
        converter = new HearingDateAnswerConverter();
        break;
      case HearingActualsAnswerSource.HEARING_RESULT_REASON:
        converter = new HearingDateAnswerConverter();
        break;
      case HearingActualsAnswerSource.HEARING_START_TIME:
        converter = new HearingDateAnswerConverter();
        break;
      case HearingActualsAnswerSource.HEARING_FINISH_TIME:
        converter = new HearingDateAnswerConverter();
        break;
      case HearingActualsAnswerSource.HEARING_PAUSE_TIME:
        converter = new HearingDateAnswerConverter();
        break;
      case HearingActualsAnswerSource.HEARING_RESUME_TIME:
        converter = new HearingDateAnswerConverter();
        break;
      case HearingActualsAnswerSource.ATTENDANCE_TYPE:
        converter = new HearingDateAnswerConverter();
        break;
      default:
        break;
    }
    return converter.transformAnswer(hearingActuals$);
  }
}
