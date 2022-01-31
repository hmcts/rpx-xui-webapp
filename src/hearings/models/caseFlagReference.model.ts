import { PartyFlagsModel } from './partyFlags.model';

export interface CaseFlagReferenceModel {
  isVisible?: boolean;
  name: string;
  hearingRelevant: boolean;
  flagComment: boolean;
  flagCode: string;
  isParent: boolean;
  Path: string[];
  partyFlagDetails?: PartyFlagsModel[];
  childFlags: CaseFlagReferenceModel[];
}
