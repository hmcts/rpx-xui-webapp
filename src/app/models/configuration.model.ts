import {CaseEditorConfig} from '@hmcts/ccd-case-ui-toolkit';

export interface ConfigurationModel {
  features: object;
  caseEditorConfig: CaseEditorConfig;
  routs: {[id: string]: string};
}
