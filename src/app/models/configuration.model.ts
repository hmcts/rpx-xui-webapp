import { CaseEditorConfig } from '@hmcts/ccd-case-ui-toolkit/lib/app.config';

export interface ConfigurationModel {
  features: any
  caseEditorConfig: CaseEditorConfig
  routes: {[id: string]: string}
}
