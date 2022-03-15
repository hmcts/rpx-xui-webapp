import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationModel } from '../models/location.model';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class CourtLocationAnswerConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) { }

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    const courtLocation: LocationModel = this.route.snapshot.data.courtLocation || {};

    return hearingState$.pipe(
      map(() => {
        return courtLocation.site_name;
      })
    );
  }
}
