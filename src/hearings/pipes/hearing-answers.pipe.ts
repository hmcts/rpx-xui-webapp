import {Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AbstractConverter} from '../converters/abstract.converter';
import { AdditionalFacilitiesConverter } from '../converters/additional-facilities.converter';
import { AdditionalSecurityConverter } from '../converters/additional-security.converter';
import {CaseFlagConverter} from '../converters/case-flag.converter';
import {CaseNameConverter} from '../converters/case-name.converter';
import {DefaultConverter} from '../converters/default.converter';
import { NumberOfAttendancesConverter } from '../converters/number-of-attendances.converter';
import { PartyChannelsConverter } from '../converters/party-channels.converter';
import {TypeConverter} from '../converters/type.converter';
import {AnswerSource} from '../models/hearings.enum';
import * as fromHearingStore from '../store';

@Pipe({
  name: 'transformAnswer'
})
export class HearingAnswersPipe implements PipeTransform {

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly route: ActivatedRoute) {
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
      case AnswerSource.ADDITIONAL_FACILITIES_REQUIRED:
        converter = new AdditionalFacilitiesConverter(this.hearingStore, this.route);
        break;
      case AnswerSource.HOW_ATTENDANT:
        converter = new PartyChannelsConverter(this.hearingStore, this.route);
        break;
      case AnswerSource.ATTENDANT_PERSON_AMOUNT:
        converter = new NumberOfAttendancesConverter(this.hearingStore, this.route);
        break;
      case AnswerSource.CASE_FLAGS:
        converter = new CaseFlagConverter(this.hearingStore, this.route);
        break;
      default:
        break;
    }
    return converter.transformAnswer();
  }

}
