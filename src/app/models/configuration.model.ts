import type { CaseEditorConfig } from '@hmcts/ccd-case-ui-toolkit/core';

export interface ConfigurationModel {
  features: object;
  caseEditorConfig: CaseEditorConfig;
  routes: { [id: string]: string };
}
