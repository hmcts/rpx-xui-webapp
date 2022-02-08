import {Pipe, PipeTransform} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AbstractConverter} from '../converters/abstract.converter';
import { AdditionalSecurityConverter } from '../converters/additional-security.converter';
import {CaseNameConverter} from '../converters/case-name.converter';
import {DefaultConverter} from '../converters/default.converter';
import {TypeConverter} from '../converters/type.converter';
import {AnswerSource} from '../models/hearings.enum';
import * as fromHearingStore from '../store';

@Pipe({
  name: 'transformAnswer'
})
export class HearingAnswersPipe implements PipeTransform {

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
  }

  public transform(answerSource: AnswerSource): Observable<string> {
    let converter: AbstractConverter = new DefaultConverter(this.hearingStore);
    switch (answerSource) {
      case AnswerSource.CASE_NAME:
        converter = new CaseNameConverter(this.hearingStore);
        break;
      case AnswerSource.Type:
        converter = new TypeConverter(this.hearingStore);
        break;
      case AnswerSource.ADDITIONAL_SECURITY_REQUIRED:
        converter = new AdditionalSecurityConverter(this.hearingStore);
        break;
      default:
        break;
    }
    return converter.transformAnswer();
  }

}
