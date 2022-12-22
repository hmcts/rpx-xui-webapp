import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CaseFlagReferenceModel} from '../models/caseFlagReference.model';
import {PartyDetailsModel} from '../models/partyDetails.model';
import {State} from '../store/reducers';
import {CaseFlagsUtils} from '../utils/case-flags.utils';
import {IsAmendedConverter} from './is-amended.converter';

export class CaseFlagAmendedConverter implements IsAmendedConverter {

  public caseFlagsRefData: CaseFlagReferenceModel[];

  constructor(protected readonly route: ActivatedRoute) {
    this.caseFlagsRefData = this.route.snapshot.data.caseFlags;
  }

  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state => {
      const partiesFromServiceValue: PartyDetailsModel[] = state.hearingValues.serviceHearingValuesModel.parties;
      const partyDetailsA = state.hearingRequestToCompare.hearingRequestMainModel.partyDetails;
      const partyWithFlagsA = CaseFlagsUtils.convertPartiesToPartyWithFlags(this.caseFlagsRefData,
        partyDetailsA, partiesFromServiceValue);
      const partyDetailsB = state.hearingRequest.hearingRequestMainModel.partyDetails;
      const partyWithFlagsB = CaseFlagsUtils.convertPartiesToPartyWithFlags(this.caseFlagsRefData,
        partyDetailsB, partiesFromServiceValue);
      return !_.isEqual(partyWithFlagsA, partyWithFlagsB);
    }));
  }
}
