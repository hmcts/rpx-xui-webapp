import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LovRefDataModel} from '../models/lovRefData.model';
import {State} from '../store';
import {HearingsUtils} from '../utils/hearings.utils';
import {AnswerConverter} from './answer.converter';

export class ReasonForCancellationAnswerConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) {
  }

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    const cancelHearingActualReasons: LovRefDataModel[] = this.route.snapshot.data.cancelHearingActualReasons;

    return hearingState$.pipe(
      map(state => {
        const hearingResultReasonType = state.hearingActuals.hearingActualsMainModel
          && state.hearingActuals.hearingActualsMainModel.hearingActuals
          && state.hearingActuals.hearingActualsMainModel.hearingActuals.hearingOutcome
          && state.hearingActuals.hearingActualsMainModel.hearingActuals.hearingOutcome.hearingResultReasonType;
        return HearingsUtils.getValue(hearingResultReasonType, cancelHearingActualReasons);
      })
    );
  }
}
