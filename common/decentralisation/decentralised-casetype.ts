/**
 * These allow services to configure the URL paths into their application for specific case types.
 */

// Only expose properties that can be used in the frontend to the frontend angular code
export interface FrontendDecentralisedCaseType {
  webUrl?: string;
}

export interface BackendDecentralisedCaseType {
  nocBaseUrl?: string;
}

// the key is the case type name
export type CaseTypeMap<T> = Record<string, T>;

// convenience interface to pass the map entry around
export interface CaseTypeMapEntry<T> {
  key: string;
  value: T;
}
