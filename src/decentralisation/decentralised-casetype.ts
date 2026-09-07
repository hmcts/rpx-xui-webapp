/**
 * These allow services to configure the URL paths into their application for specific case types.
 * N.B. These definitions are duplicated in api/noc/index.ts and must correlate
 * TODO created shared module that holds these definitions and any shared code
 */
export interface DecentralisedCaseType {
  webUrl?: string;
}

// the key is the case type name
export type DecentralisedCaseTypeMap = Record<string, DecentralisedCaseType>;
