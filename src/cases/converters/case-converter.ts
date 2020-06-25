import {SearchResultViewItem} from '@hmcts/ccd-case-ui-toolkit';
import {SharedCase} from '../models/case-share/case-share.module';

export function toShareCaseConverter(selectedCases: SearchResultViewItem[]): SharedCase[] {
  const sharedCases: SharedCase[] = [];
  for (let i = 0, l = selectedCases.length; i < l; i++) {
    // const caseReference = selectedCases[i].case_fields.hasOwnProperty('solsSolicitorAppReference') ? selectedCases[i].case_fields['solsSolicitorAppReference'] : '';
    // const casePrimaryApplicant = `${selectedCases[i].case_fields.hasOwnProperty('primaryApplicantForenames') ? selectedCases[i].case_fields['primaryApplicantForenames'] : ''} ${selectedCases[i].case_fields.hasOwnProperty('primaryApplicantForenames') ? selectedCases[i].case_fields['primaryApplicantForenames'] : ''}`;
    const shareCase = {
      caseId: selectedCases[i].case_id,
      caseTitle: ''
    };
    sharedCases.push(shareCase);
  }
  return sharedCases;
}
