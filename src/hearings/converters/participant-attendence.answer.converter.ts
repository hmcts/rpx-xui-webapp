import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PartyType } from '../models/hearings.enum';
import { PartyDetailsModel } from '../models/partyDetails.model';
import { State } from '../store';
import { HearingsUtils } from '../utils/hearings.utils';
import { AnswerConverter } from './answer.converter';

export class ParticipantAttendenceAnswerConverter implements AnswerConverter {
  constructor(
    protected readonly route: ActivatedRoute) {}

  public transformAnswer(hearingState$: Observable<State>, index: number): Observable<string> {
    const partyChannels = [...this.route.snapshot.data.partyChannels, ...this.route.snapshot.data.partySubChannels];

    return hearingState$.pipe(
      filter((state: State) => !!state),
      map((state: State) => {
        // There are potentially party details in 3 places:
        // 1) In state.hearingValues.parties - values supplied originally by service
        // 2) In state.hearingRequest.hearingRequestMainModel.partyDetails - values sent to HMC
        // 3) In state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].attendees
        // - this is returned by HMC, but seems to be blank at least sometimes
        // Probably the most appropriate thing to do is to check each of these in the order 3,2,1
        // 3, when available is just party ids, so we need to use data from 1) to convert the ID to a name

        const hearingResponse = state.hearingRequest.hearingRequestMainModel.hearingResponse;
        let hearingDaySchedule = hearingResponse && hearingResponse.hearingDaySchedule;
        const partiesFromServiceValue = state.hearingValues.serviceHearingValuesModel.parties?.filter((party) => party.partyType === PartyType.IND);
        const partyIds = partiesFromServiceValue.map((party) => party.partyID);
        hearingDaySchedule = HearingsUtils.sortHearingDaySchedule(hearingDaySchedule);

        const partiesFromRequest = hearingDaySchedule[index || 0]
          .attendees
          ?.filter((attendee) => partyIds.includes(attendee.partyID));
        const attendeeParties = partiesFromRequest.map((partyInfo) => {
          const name = HearingsUtils.getPartyName(partiesFromServiceValue, partyInfo);
          const chan = HearingsUtils.getPartyChannelValue(partyChannels, partyInfo);
          return `${name} - ${chan}`;
        });
        if (attendeeParties?.length > 0) {
          return attendeeParties.join('<br>');
        }
        let pdm: PartyDetailsModel[] = [];
        if (state.hearingRequest.hearingRequestMainModel.partyDetails?.length > 0) {
          pdm = state.hearingRequest.hearingRequestMainModel.partyDetails;
        } else if (partiesFromRequest?.length > 0) {
          pdm = partiesFromRequest;
        }
        const ret = pdm
          .filter((pd) => pd.individualDetails?.firstName?.length > 0)
          .map((pd) => {
            const name = HearingsUtils.getNameFromFirstLast(pd.individualDetails.firstName,
              pd.individualDetails.lastName);
            const chan = HearingsUtils.getPartyChannelValue(partyChannels, pd);
            return `${name} - ${chan}`;
          }).join('<br>');
        if (ret?.length > 0) {
          return ret;
        }
        return 'No party details found';
      })
    );
  }
}
