import { SearchResultViewItem } from '@hmcts/ccd-case-ui-toolkit';
import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';
import * as converts from 'src/cases/converters/case-converter';

describe('case converters', () => {

  it('should convert to share case', () => {
    const selectedCases = [{
      case_id: '1',
      case_fields: {
        '[CASE_TYPE]': 'FinancialRemedyContested',
        applicantFMName: 'James',
        applicantLName: 'Priest',
        appRespondentFMName: 'Charlotte',
        appRespondentLName: 'Godard'
      }
    }, {
      case_id: '2',
      case_fields: {
        '[CASE_TYPE]': 'FinancialRemedyContested',
        applicantFMName: 'Kenneth',
        applicantLName: 'Priest',
        appRespondentFMName: 'Kathy',
        appRespondentLName: 'Godard'
      }
    }];
    const expectedShareCases = [{caseId: '1', caseTitle: 'James Priest Vs Charlotte Godard', caseTypeId: 'FinancialRemedyContested'},
      {caseId: '2', caseTitle: 'Kenneth Priest Vs Kathy Godard', caseTypeId: 'FinancialRemedyContested'}];
    const shareCases: SharedCase[] = converts.toShareCaseConverter(selectedCases);
    expect(shareCases).toEqual(expectedShareCases);
  });

  it('should convert case title', () => {
    const selectedCases = [{
      case_id: '1',
      case_fields: {
        '[CASE_TYPE]': 'DIVORCE',
        D8PetitionerFirstName: 'James',
        D8PetitionerLastName: 'Priest',
        D8RespondentFirstName: 'Charlotte',
        D8RespondentLastName: 'Godard'
      }
    }, {
      case_id: '2',
      case_fields: {
        '[CASE_TYPE]': 'DIVORCE',
        D8PetitionerFirstName: 'Kenneth',
        D8PetitionerLastName: 'Priest',
        D8RespondentFirstName: 'Kathy',
        D8RespondentLastName: 'Godard'
      }
    }];
    const expectedShareCases = [{caseId: '1', caseTitle: 'James Priest Vs Charlotte Godard', caseTypeId: 'DIVORCE'},
      {caseId: '2', caseTitle: 'Kenneth Priest Vs Kathy Godard', caseTypeId: 'DIVORCE'}];
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
