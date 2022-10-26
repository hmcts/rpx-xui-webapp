import { CaseEditorConfig } from '@hmcts/ccd-case-ui-toolkit/lib/app.config';

export interface ConfigurationModel {
  features: object;
  caseEditorConfig: CaseEditorConfig;
  routes: {[id: string]: string};
}
