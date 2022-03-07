import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {AdditionalFacilitiesAmendedConverter} from '../converters/additional-facilities.amended.converter';
import {AdditionalSecurityAmendedConverter} from '../converters/additional-security.amended.converter';
import {DefaultAmendedConverter} from '../converters/default.amended.converter';
import { HowManyPeopleAttendAmendedConverter } from '../converters/how-many-people-attend.amended.converter';
import { HowPartyAttendAmendedConverter } from '../converters/how-party-attend.amended.converter';
import {IsAmendedConverter} from '../converters/is-amended.converter';
import { StageAmendedConverter } from '../converters/stage.amended.converter';
import {VenueAmendedConverter} from '../converters/venue.amended.converter';
import {AnswerSource} from '../models/hearings.enum';
import {State} from '../store';

@Pipe({
  name: 'isAmended'
})
export class IsAmendedPipe implements PipeTransform {

  public transform(answerSource: AnswerSource, hearingState$: Observable<State>): Observable<boolean> {
    let converter: IsAmendedConverter = new DefaultAmendedConverter();
    switch (answerSource) {
      case AnswerSource.VENUE:
        converter = new VenueAmendedConverter();
        break;
      case AnswerSource.ADDITIONAL_SECURITY_REQUIRED:
        converter = new AdditionalSecurityAmendedConverter();
        break;
      case AnswerSource.ADDITIONAL_FACILITIES_REQUIRED:
        converter = new AdditionalFacilitiesAmendedConverter();
        break;
      case AnswerSource.HOW_ATTENDANT:
        converter = new HowPartyAttendAmendedConverter();
        break;
      case AnswerSource.ATTENDANT_PERSON_AMOUNT:
        converter = new HowManyPeopleAttendAmendedConverter();
        break;
      case AnswerSource.STAGE:
        converter = new StageAmendedConverter();
        break;
      default:
        break;
    }
    return converter.transformIsAmended(hearingState$);
  }

}
