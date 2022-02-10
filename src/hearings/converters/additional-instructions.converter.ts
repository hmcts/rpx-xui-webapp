import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as fromHearingStore from '../store';
import {AbstractConverter} from './abstract.converter';

export class AdditionalInstructionsConverter extends AbstractConverter {

  constructor(
    protected readonly hearingStore: Store<fromHearingStore.State>) {
    super(hearingStore);
  }

  public transformAnswer(): Observable<string> {
    return this.hearingState.pipe(
      map(state => {
        const additionalInstructions = state.hearingRequest.hearingRequestMainModel.hearingDetails.listingComments;
        if (!additionalInstructions) {
          return additionalInstructions;
        };

        const formattedInstructions = additionalInstructions.replace(/(?:\r\n|\r|\n)/g, '<br>');
        return formattedInstructions;
      })
    );
  }
}
