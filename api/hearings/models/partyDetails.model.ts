import {PartyType} from './hearings.enum';
import {IndividualDetailsModel} from './individualDetails.model';
import {OrganisationDetailsModel} from './organisationDetails.model';
import {UnavailabilityDOWModel} from './unavailabilityDOW.model';
import {UnavailabilityRangeModel} from './unavailabilityRange.model';

export interface PartyDetailsModel {
  partyID: string;
  partyType: PartyType;
  partyName: string; // to be removed
  partyChannel: string; // to be removed
  partyRole: string;
  individualDetails?: IndividualDetailsModel;
  organisationDetails?: OrganisationDetailsModel;
  unavailabilityDOW?: UnavailabilityDOWModel[];
  unavailabilityRanges?: UnavailabilityRangeModel[];
}
