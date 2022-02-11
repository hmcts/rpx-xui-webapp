import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AnswerConverter} from './answer.converter';
import {RefDataModel} from '../models/refData.model';
import { State } from '../store';

export class StageConverter implements AnswerConverter {

  constructor(
    protected readonly route: ActivatedRoute) {
  }

  private static getHearingTypeDisplayValue(hearingStageOptions: RefDataModel[], key: string): string {
    return hearingStageOptions.find(stage => stage.key === key).value_en;
  }

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    const hearingStageOptions = this.route.snapshot.data.hearingStageOptions;

    return hearingState$.pipe(
      map(state => {
        const selection = state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingType;

        return StageConverter.getHearingTypeDisplayValue(hearingStageOptions, selection);
      })
    );
  }
}
