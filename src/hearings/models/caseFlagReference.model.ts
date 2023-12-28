export interface CaseFlagReferenceModel {
  name: string;
  hearingRelevant: boolean;
  flagComment: boolean;
  flagCode: string;
  isParent: boolean;
  Path: string[];
  childFlags: CaseFlagReferenceModel[];
}
