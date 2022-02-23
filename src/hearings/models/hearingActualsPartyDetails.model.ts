import {PartyType} from './hearings.enum';
import {IndividualDetailsModel} from './individualDetails.model';
import {OrganisationDetailsModel} from './organisationDetails.model';

export interface HearingActualsPartyDetailsModel {
  partyID?: string;
  partyType?: PartyType;
  partyName?: string;
  partyChannel: string;
  partyRole?: string;
  individualDetails?: IndividualDetailsModel;
  organisationDetails?: OrganisationDetailsModel;
  HMTLTitle: string;
}
