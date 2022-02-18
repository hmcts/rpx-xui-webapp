import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LovRefDataModel} from '../models/lovRefData.model';
import {PartyDetailsModel} from '../models/partyDetails.model';
import * as fromHearingStore from '../store';
import {AnswerConverter} from './answer.converter';

export class PartyChannelsAnswerConverter implements AnswerConverter {

  constructor(
    protected readonly route: ActivatedRoute) {
  }

  private static getPartyChannelValue(refData: LovRefDataModel[], party: PartyDetailsModel): string {
    return refData.find(ref => ref.key === party.partyChannel).value_en;
  }

  public transformAnswer(hearingState$: Observable<fromHearingStore.State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        const partyChannels = this.route.snapshot.data.partyChannels;
        const  parties = state.hearingRequest.hearingRequestMainModel.partyDetails;
        return parties
          .reduce((acc: string, party: PartyDetailsModel, index: number) => {
            const name = party.partyName;
            const value = PartyChannelsAnswerConverter.getPartyChannelValue(partyChannels, party);
            if (index === 0) {
              return `<ul><li>${name} - ${value}</li>`;
            }
            return index === parties.length - 1 ? `${acc}<li>${name} - ${value}</li></ul>` : `${acc}<li>${name} - ${value}</li>`;
          }, '');
      })
    );
  }
}
