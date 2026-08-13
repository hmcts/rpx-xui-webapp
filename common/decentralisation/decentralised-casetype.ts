/**
 * These allow services to configure the URL paths into their application for specific case types.
 */
export interface DecentralisedCaseType {
  webUrl?: string;
  nocBaseUrl?: string;
}

// the key is the case type name
export type DecentralisedCaseTypeMap = Record<string, DecentralisedCaseType>;

// convenience interface to pass the map entry around
export interface CaseTypeMapEntry {
  key: string;
  value: DecentralisedCaseType;
}
