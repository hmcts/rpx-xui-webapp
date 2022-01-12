export interface RoleCaseData {
  id: string;
  case_name: string;
  case_id: string;
  case_category: string;
  case_type?: string;
  case_role: string;
  role_category: string;
  role?: string;
  jurisdiction: string;
  jurisdictionId?: string;
  location_id: string;
  startDate: Date;
  endDate: Date;
  assignee: string;
  state?: string;
  version?: string;
  created_date?: string;
  last_modified?: string;
  last_state_modified_date?: string;
  security_classification?: string;
  case_data?: {
    appellantHasFixedAddress?: string,
    legalRepReferenceNumber?: string,
    legalRepDeclaration?: string[],
    appellantDateOfBirth?: string,
    hasOtherAppeals?: string,
    hmctsCaseCategory?: string,
    appellantGivenNames?: string,
    appellantTitle?: string,
    appellantNationalities?: string[],
    homeOfficeDecisionDate?: string,
    sendDirectionActionAvailable?: string,
    hasNewMatters?: string,
    homeOfficeReferenceNumber?: string
  };
}
