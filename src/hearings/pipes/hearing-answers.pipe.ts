import {Pipe, PipeTransform} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AbstractAnswerConverter} from '../converters/abstract.answer.converter';
import {CaseNameAnswerConverter} from '../converters/case-name.answer.converter';
import {DefaultAnswerConverter} from '../converters/default.answer.converter';
import {NeedWelshAnswerConverter} from '../converters/need-welsh.answer.converter';
import {TypeAnswerConverter} from '../converters/type.answer.converter';
import {VenueAnswerConverter} from '../converters/venue.answer.converter';
import {AnswerSource} from '../models/hearings.enum';
import * as fromHearingStore from '../store';

@Pipe({
  name: 'transformAnswer'
})
export class HearingAnswersPipe implements PipeTransform {

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
  }

  public transform(answerSource: AnswerSource): Observable<string> {
    let converter: AbstractAnswerConverter = new DefaultAnswerConverter(this.hearingStore);
    switch (answerSource) {
      case AnswerSource.CASE_NAME:
        converter = new CaseNameAnswerConverter(this.hearingStore);
        break;
      case AnswerSource.Type:
        converter = new TypeAnswerConverter(this.hearingStore);
        break;
      case AnswerSource.VENUE:
        converter = new VenueAnswerConverter(this.hearingStore);
        break;
      case AnswerSource.NEED_WELSH:
        converter = new NeedWelshAnswerConverter(this.hearingStore);
        break;
      default:
        break;
    }
    return converter.transformAnswer();
  }

}
