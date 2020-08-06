import { SearchResultViewItem } from '@hmcts/ccd-case-ui-toolkit';
import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';
import * as converts from 'src/cases/converters/case-converter';

describe('case converters', () => {

  it('should convert to share case', () => {
    const selectedCases = [{
      case_id: '1',
      case_fields: {
        '[CASE_TYPE]': 'FinancialRemedyContested'
      }
    }, {
      case_id: '2',
      case_fields: {
        '[CASE_TYPE]': 'FinancialRemedyContested'
      }
    }];
    const expectedShareCases = [{caseId: '1', caseTitle: '', caseTypeId: 'FinancialRemedyContested'}, {caseId: '2', caseTitle: '', caseTypeId: 'FinancialRemedyContested'}];
    const shareCases: SharedCase[] = converts.toShareCaseConverter(selectedCases);
    expect(shareCases).toEqual(expectedShareCases);
  });

  it('should convert to search result view item', () => {
    const sharedCases = [{caseId: '1', caseTitle: '', caseTypeId: 'FinancialRemedyContested'}, {caseId: '2', caseTitle: '', caseTypeId: 'FinancialRemedyContested'}];
    const expectedSearchResultViewItem = [{
      case_id: '1',
      case_fields: {
        '[CASE_TYPE]': 'FinancialRemedyContested',
        case_title: ''
      }
    }, {
      case_id: '2',
      case_fields: {
        '[CASE_TYPE]': 'FinancialRemedyContested',
        case_title: ''
      }
    }];
    const searchResultViewItem: SearchResultViewItem[] = converts.toSearchResultViewItemConverter(sharedCases);
    expect(searchResultViewItem).toEqual(expectedSearchResultViewItem);
  });
});
