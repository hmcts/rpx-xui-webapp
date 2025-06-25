/**
 * Lite version of the Jurisdiction model with only the fields needed for UI display and filtering
 * This reduces the payload size compared to the full CCD Jurisdiction model
 */
export interface JurisdictionLite {
  id: string;
  name: string;
  caseTypes: CaseTypeLite[];
}

/**
 * Lite version of CaseType with minimal fields needed
 */
export interface CaseTypeLite {
  id: string;
  name: string;
  states: CaseStateLite[];
}

/**
 * Lite version of CaseState with minimal fields needed
 */
export interface CaseStateLite {
  id: string;
  name: string;
}
