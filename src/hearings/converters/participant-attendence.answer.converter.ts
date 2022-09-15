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
    const preferredHearingChannelRefData = refData.find(ref => ref.key === party.hearingSubChannel);
    return preferredHearingChannelRefData && preferredHearingChannelRefData.value_en ? preferredHearingChannelRefData.value_en : party.hearingSubChannel;
  }

  private static getPartyName(partiesFromServiceValue: PartyDetailsModel[], partyInfo: PartyDetailsModel): string {
    const partyDetails = partiesFromServiceValue.find(pty => pty.partyID === partyInfo.partyID);
    return (partyDetails && partyDetails.partyName) || partyInfo.partyID;
  }

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    const partyChannels = this.route.snapshot.data.partyChannels;

    return hearingState$.pipe(
      map(state => {
        const partiesFromRequest: PartyDetailsModel[] = state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].attendees;
        const partiesFromServiceValue: PartyDetailsModel[] = state.hearingValues.serviceHearingValuesModel.parties;
        return partiesFromRequest.map((partyInfo) => {
          const name = ParticipantAttendenceAnswerConverter.getPartyName(partiesFromServiceValue, partyInfo);
          const value = ParticipantAttendenceAnswerConverter.getPartyChannelValue(partyChannels, partyInfo);
          return `${name} - ${value}`;
        }).join('<br>');
      })
    );
  }
}
