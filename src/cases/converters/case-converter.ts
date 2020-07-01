import { SearchResultViewItem } from '@hmcts/ccd-case-ui-toolkit';
import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';

export function toShareCaseConverter(selectedCases: SearchResultViewItem[]): SharedCase[] {
  const sharedCases: SharedCase[] = [];
  for (const selectCase of selectedCases) {
    const shareCase = {
      caseId: selectCase.case_id,
      caseTitle: ''
    };
    sharedCases.push(shareCase);
  }
  return sharedCases;
}
