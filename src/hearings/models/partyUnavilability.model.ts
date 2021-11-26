export interface PartyUnavailabilityModel {
  partyName: string;
  partyChannel: string;
  unavailability: [
    {
      start: string;
      end: string;
    }
  ];
}
