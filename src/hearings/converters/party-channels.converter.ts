import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PartyDetailsModel } from '../models/partyDetails.model';
import { RefDataModel } from '../models/refData.model';
import * as fromHearingStore from '../store';
import { AnswerConverter } from './answer.converter';

export class PartyChannelsConverter implements AnswerConverter {

  constructor(
    protected readonly route: ActivatedRoute) {
  }

  private static getPartyChannelValue(refData: RefDataModel[], party: PartyDetailsModel): string {
    return refData.find(facility => facility.key === party.partyChannel).value_en;
  }

  public transformAnswer(hearingState$: Observable<fromHearingStore.State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        const partyChannels = this.route.snapshot.data.partyChannels;
        return state.hearingValues.serviceHearingValuesModel.parties
          .reduce((acc: string, party: PartyDetailsModel, index: number) => {
            const name = party.partyName;
            const value = PartyChannelsConverter.getPartyChannelValue(partyChannels, party);
            if (index === 0) {
              return `<ul><li>Jane and Smith - ${value}</li>`;
            }
            return index === partyChannels.length - 1 ? `${acc}<li>${name} - ${value}</li></ul>` : `${acc}<li>${name} - ${value}</li>`;
          }, '');
      })
    );
  }
}
