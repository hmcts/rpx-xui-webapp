export interface PartyFlagsModel {
  partyID: string;
  partyName: string;
  flagParentId?: string;
  flagId: string;
  flagDescription: string;
  flagStatus: string;
}

export interface PartyFlagsDisplayModel {
  partyID: string;
  partyName: string;
  flagParentId?: string;
  flagId: string;
  flagDescription: string;
  flagStatus: string;
  displayName: string;
  displayPath: string[];
}
