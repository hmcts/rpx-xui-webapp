import { PartyUnavailabilityRange } from './partyUnavilabilityRange.model';

export interface PartyUnavailabilityModel {
  partyName: string;
  partyChannel: string;
  unavailability: PartyUnavailabilityRange[];
}
