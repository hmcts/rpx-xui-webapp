import { AmendmentLabelStatus } from './hearingsUpdateMode.enum';

export interface PartyFlagsModel {
  partyId: string;
  partyName: string;
  flagParentId?: string;
  flagId: string;
  flagDescription: string;
  flagStatus: string;
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
  flagAmendmentLabelStatus?: AmendmentLabelStatus;
}
