import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LovRefDataModel } from '../models/lovRefData.model';
import { PartyDetailsModel } from '../models/partyDetails.model';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class ParticipantAttendenceAnswerConverter implements AnswerConverter {

  constructor(
    protected readonly route: ActivatedRoute) {
  }

  private static getPartyChannelValue(refData: LovRefDataModel[], party: PartyDetailsModel): string {
    const preferredHearingChannelRefData = refData.find(ref => ref.key === party.individualDetails.preferredHearingChannel);
    return preferredHearingChannelRefData && preferredHearingChannelRefData.value_en ? preferredHearingChannelRefData.value_en : '';
  }

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    const partyChannels = this.route.snapshot.data.partyChannels;

    return hearingState$.pipe(
      map(state => {
        const partiesFromRequest: PartyDetailsModel[] = state.hearingRequest.hearingRequestMainModel.partyDetails;
        const partiesFromServiceValue: PartyDetailsModel[] = state.hearingValues.serviceHearingValuesModel.parties;
        return partiesFromRequest.map((partyInfo) => {
          const name = partyInfo.partyName ? partyInfo.partyName : partiesFromServiceValue.find(pty => pty.partyID === partyInfo.partyID).partyName;
          const value = ParticipantAttendenceAnswerConverter.getPartyChannelValue(partyChannels, partyInfo);
          return `${name} - ${value}`;
        }).join('<br>');
      })
    );
  }
}
