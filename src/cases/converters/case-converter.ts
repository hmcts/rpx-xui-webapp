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

export function toSearchResultViewItemConverter(shareCases: SharedCase[]): SearchResultViewItem[] {
  const searchResultViewItems: SearchResultViewItem[] = [];
  for (const shareCase of shareCases) {
    const searchResultViewItem = {
      case_id: shareCase.caseId,
      case_fields: null
    };
    searchResultViewItems.push(searchResultViewItem);
  }
  return searchResultViewItems;
}
