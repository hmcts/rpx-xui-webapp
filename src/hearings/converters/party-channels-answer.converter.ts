import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PartyType} from '../models/hearings.enum';
import {LovRefDataModel} from '../models/lovRefData.model';
import {PartyDetailsModel} from '../models/partyDetails.model';
import * as fromHearingStore from '../store';
import {AnswerConverter} from './answer.converter';

export class PartyChannelsAnswerConverter implements AnswerConverter {

  constructor(
    protected readonly route: ActivatedRoute) {
  }

  private static getPartyChannelValue(refData: LovRefDataModel[], party: PartyDetailsModel): string {
    let preferredHearingChannelRefData = null;
    if (party.individualDetails) {
      preferredHearingChannelRefData = refData.find(ref => ref.key === party.individualDetails.preferredHearingChannel);
    }
    return preferredHearingChannelRefData && preferredHearingChannelRefData.value_en ? preferredHearingChannelRefData.value_en : '';
  }

  public transformAnswer(hearingState$: Observable<fromHearingStore.State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        const partyChannels = this.route.snapshot.data.partyChannels;
        const partiesFromRequest = state.hearingRequest.hearingRequestMainModel.partyDetails;
        const partiesFromServiceValue = state.hearingValues.serviceHearingValuesModel.parties;
        return partiesFromRequest.filter(party => party.partyType === PartyType.IND)
          .reduce((acc: string, party: PartyDetailsModel, index: number) => {
            const foundPartyFromService = partiesFromServiceValue.find(pty => pty.partyID === party.partyID);
            const name = party.partyName ? party.partyName : (foundPartyFromService ? foundPartyFromService.partyName : '');
            const value = PartyChannelsAnswerConverter.getPartyChannelValue(partyChannels, party);
            if (index === 0) {
              return `<ul><li>${name} - ${value}</li>`;
            }
            return index === partiesFromRequest.length - 1 ? `${acc}<li>${name} - ${value}</li></ul>` : `${acc}<li>${name} - ${value}</li>`;
          }, '');
      })
    );
  }
}
