import {CaseEditorConfig} from '@hmcts/ccd-case-ui-toolkit';

export interface Feature {
  isEnabled: boolean;
  label: string;
}

export interface FeatureCollection {
  [key: string]: Feature;
}

export interface UrlCollection {
  idamApiUrl: string;
  idamClientID: string;
  idamLoginUrl: string;
  indexUrl: string;
  oauthCallbackUrl: string;
}

export class ConfigurationModel {
  public features: FeatureCollection;
  public caseEditorConfig: CaseEditorConfig;
  public urls: { [id: string]: UrlCollection };
}
