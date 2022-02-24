import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {DefaultAmendedConverter} from '../converters/default.amended.converter';
import {IsAmendedConverter} from '../converters/is-amended.converter';
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
      default:
        break;
    }
    return converter.transformIsAmended(hearingState$);
  }

}
