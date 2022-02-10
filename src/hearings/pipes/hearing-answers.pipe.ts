import {Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {AnswerConverter} from '../converters/answer.converter';
import {CaseFlagConverter} from '../converters/case-flag.converter';
import {CaseNameAnswerConverter} from '../converters/case-name.answer.converter';
import {DefaultAnswerConverter} from '../converters/default.answer.converter';
import {NeedWelshAnswerConverter} from '../converters/need-welsh.answer.converter';
import {TypeAnswerConverter} from '../converters/type.answer.converter';
import {VenueAnswerConverter} from '../converters/venue.answer.converter';
import {AnswerSource} from '../models/hearings.enum';
import {State} from '../store';

@Pipe({
  name: 'transformAnswer'
})
export class HearingAnswersPipe implements PipeTransform {

  constructor(protected readonly route: ActivatedRoute) {
  }

  public transform(answerSource: AnswerSource, hearingState$: Observable<State>): Observable<string> {
    let converter: AnswerConverter = new DefaultAnswerConverter();
    switch (answerSource) {
      case AnswerSource.CASE_NAME:
        converter = new CaseNameAnswerConverter();
        break;
      case AnswerSource.Type:
        converter = new TypeAnswerConverter();
        break;
      case AnswerSource.CASE_FLAGS:
        converter = new CaseFlagConverter(this.route);
        break;
      case AnswerSource.VENUE:
        converter = new VenueAnswerConverter();
        break;
      case AnswerSource.NEED_WELSH:
        converter = new NeedWelshAnswerConverter();
        break;
      default:
        break;
    }
    return converter.transformAnswer(hearingState$);
  }

}
