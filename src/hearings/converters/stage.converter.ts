import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RefDataModel} from '../models/refData.model';
import * as fromHearingStore from '../store';
import {AbstractConverter} from './abstract.converter';

export class StageConverter extends AbstractConverter {

  constructor(
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly route: ActivatedRoute) {
    super(hearingStore);
  }

  private static getHearingTypeDisplayValue(hearingStageOptions: RefDataModel[], key: string): string {
    return hearingStageOptions.find(stage => stage.key === key).value_en;
  }

  public transformAnswer(): Observable<string> {
    const hearingStageOptions = this.route.snapshot.data.hearingStageOptions;

    return this.hearingState.pipe(
      map(state => {
        const selection = state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingType;

        return StageConverter.getHearingTypeDisplayValue(hearingStageOptions, selection);
      })
    );
  }
}
