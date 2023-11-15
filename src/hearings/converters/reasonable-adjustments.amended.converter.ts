import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store/reducers';
import { IsAmendedConverter } from './is-amended.converter';
import { PartyDetailsModel } from '../models/partyDetails.model';
import { PartyType } from '../models/hearings.enum';

export class ReasonableAdjustmentsAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      return this.checkReasonableAdjustments(state.hearingRequest.hearingRequestMainModel.partyDetails,
        state.hearingRequestToCompare.hearingRequestMainModel.partyDetails);
    }));
  }

  // Check with Andy - do we also need to check party.individualDetails?.otherReasonableAdjustmentDetails
  private checkReasonableAdjustments(originalPartyDetails: PartyDetailsModel[], partyDetailsToCompare: PartyDetailsModel[]) {
    return partyDetailsToCompare.some(party => {
      if (party.partyType === PartyType.IND) {
        let originalParty = originalPartyDetails.find(op => op.partyID === party.partyID);
        if (originalParty) {
          return !_.isEqual(originalParty.individualDetails?.reasonableAdjustments, party.individualDetails?.reasonableAdjustments);
        }
        if (party.individualDetails?.reasonableAdjustments){
          return true
        }
      }
      return false;
    });
  }
}
