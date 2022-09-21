import {ActivatedRoute} from '@angular/router';
import {LocationModel} from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../store';
import {AnswerConverter} from './answer.converter';

export class CourtLocationAnswerConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) {
  }

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    const courtLocation: LocationModel[] = this.route.snapshot.data.courtLocation || [];

    return hearingState$.pipe(
      map(() => {
        return courtLocation.length && courtLocation[0].site_name;
      })
    );
  }
}
