import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PartyType} from '../models/hearings.enum';
import {PartyDetailsModel} from '../models/partyDetails.model';
import {State} from '../store/reducers';
import {IsAmendedConverter} from './is-amended.converter';

export class HowPartyAttendAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state => {
      const objA = this.getPartyWithChannel(state.hearingRequestToCompare.hearingRequestMainModel.partyDetails);
      const objB = this.getPartyWithChannel(state.hearingRequest.hearingRequestMainModel.partyDetails);
      return !_.isEqual(objA, objB);
    }));
  }

  private getPartyWithChannel(partyDetailsModels: PartyDetailsModel[]): Map<string, string> {
    const partyWithChannel: Map<string, string> = new Map();
    partyDetailsModels.filter(pt => pt.partyType === PartyType.IND).forEach(
      party => partyWithChannel.set(party.partyID, party.individualDetails && party.individualDetails.preferredHearingChannel)
    );
    return partyWithChannel;
  }
}
