export interface DecentralisedCaseTypeConfig {
  webUrl?: string;
}

// the key is the case type name
export type DecentralisedCaseTypeConfigMap = Record<string, DecentralisedCaseTypeConfig>;
