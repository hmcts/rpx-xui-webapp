export interface PartyFlagsModel {
  partyName: string;
  flagParentId?: string;
  flagId: string;
  flagDescription: string;
  flagStatus: string;
}

export interface PartyFlagsDisplayModel {
  partyName: string;
  flagParentId?: string;
  flagId: string;
  flagDescription: string;
  flagStatus: string;
  displayName: string;
  displayPath: string[];
}
