export interface PartyFlagsModel {
  partyId: string;
  partyName: string;
  flagParentId?: string;
  flagId: string;
  flagDescription: string;
  flagStatus: string;
  dateTimeCreated?: string;
  dateTimeModified?: string;
}

export interface PartyFlagsDisplayModel {
  partyId: string;
  partyName: string;
  flagParentId?: string;
  flagId: string;
  flagDescription: string;
  flagStatus: string;
  displayName: string;
  displayPath: string[];
}
