import { SearchResultViewItem } from '@hmcts/ccd-case-ui-toolkit';
import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';

const BLANK_SPACE = ' ';
const EMPTY_SPACE = '';
const VERSUS_SPACE = ' Vs ';

export const toShareCaseConverter = (selectedCases: SearchResultViewItem[]): SharedCase[] => {
  const sharedCases: SharedCase[] = [];
  for (const selectCase of selectedCases) {
    const caseTypeId = getValueByPropertyName(selectCase, '[CASE_TYPE]');
    const caseTitle = getValueByPropertyName(selectCase, 'case_title');
    const shareCase = {
      caseId: selectCase.case_id,
      caseTitle: caseTitle ? caseTitle : combineCaseTitleByCaseType(caseTypeId, selectCase),
      caseTypeId
    };
    sharedCases.push(shareCase);
  }
  return sharedCases;
};

export const toSearchResultViewItemConverter = (shareCases: SharedCase[]): SearchResultViewItem[] => {
  const searchResultViewItems: SearchResultViewItem[] = [];
  for (const shareCase of shareCases) {
    const searchResultViewItem = {
      case_id: shareCase.caseId,
      case_fields: {
        '[CASE_TYPE]': shareCase.caseTypeId,
        case_title: shareCase.caseTitle
      }
    };
    searchResultViewItems.push(searchResultViewItem);
  }
  return searchResultViewItems;
};

const getValueByPropertyName = (selectCase: SearchResultViewItem, propName: string): any => selectCase.case_fields && selectCase.case_fields.hasOwnProperty(propName) ?
    selectCase.case_fields[propName] : '';

const combineCaseTitleByCaseType = (caseTypeId: string, selectCase: SearchResultViewItem): string => {
  if (caseTypeId.includes('FinancialRemedy')) {
    const applicantName = getApplicantName(selectCase);
    const respondentName = getRespondentName(selectCase);
    return applicantName + showVersus(applicantName, respondentName) + respondentName;
  } else if (caseTypeId.includes('DIVORCE')) {
    const marriagePetitionerName = getValueByPropertyName(selectCase, 'D8PetitionerFirstName') + BLANK_SPACE + getValueByPropertyName(selectCase, 'D8PetitionerLastName');
    const marriageRespondentName = getValueByPropertyName(selectCase, 'D8RespondentFirstName') + BLANK_SPACE + getValueByPropertyName(selectCase, 'D8RespondentLastName');
    return marriagePetitionerName + showVersus(marriagePetitionerName, marriageRespondentName) + marriageRespondentName;
  } else {
    return selectCase.case_id;
  }
};

const getApplicantName = (selectCase: SearchResultViewItem) => {
  return getValueByPropertyName(selectCase, 'applicantFMName') && getValueByPropertyName(selectCase, 'applicantLName') ?
    getValueByPropertyName(selectCase, 'applicantFMName') + BLANK_SPACE + getValueByPropertyName(selectCase, 'applicantLName') :
    getValueByPropertyName(selectCase, 'applicantLName') ? getValueByPropertyName(selectCase, 'applicantLName') : EMPTY_SPACE;
}

const getRespondentName = (selectCase: SearchResultViewItem) => {
  let respondentName = getValueByPropertyName(selectCase, 'appRespondentFMName') && getValueByPropertyName(selectCase, 'appRespondentLName') ?
    getValueByPropertyName(selectCase, 'appRespondentFMName') + BLANK_SPACE + getValueByPropertyName(selectCase, 'appRespondentLName') :
    getValueByPropertyName(selectCase, 'appRespondentLName') ? getValueByPropertyName(selectCase, 'appRespondentLName') : EMPTY_SPACE;
  if (!respondentName) {
    respondentName = getValueByPropertyName(selectCase, 'respondentFMName') && getValueByPropertyName(selectCase, 'respondentLName') ?
      getValueByPropertyName(selectCase, 'respondentFMName') + BLANK_SPACE + getValueByPropertyName(selectCase, 'respondentLName') :
      getValueByPropertyName(selectCase, 'respondentLName') ? getValueByPropertyName(selectCase, 'respondentLName') : EMPTY_SPACE;
  }
  return respondentName;
};

const showVersus = (v1, v2) => {
  if (v1 && v2) {
    return VERSUS_SPACE;
  } else {
    return EMPTY_SPACE;
  }
};
