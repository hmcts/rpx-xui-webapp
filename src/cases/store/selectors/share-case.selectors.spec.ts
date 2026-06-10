import { SharedCase } from '@hmcts/rpx-xui-common-lib';
import { getShareCaseListState } from '../index';
import { ShareCasesState } from '../reducers';

describe('Share case selectors', () => {
  describe('get share case state', () => {
    it('should return search state', () => {
      const selectedCases: SharedCase[] = [
        { caseId: '1', caseTitle: 'James123' },
        { caseId: '2', caseTitle: 'Steve321' },
      ];
      const shareCaseState: ShareCasesState = {
        shareCases: selectedCases,
        loading: false,
        error: undefined,
        users: [],
      };

      expect(getShareCaseListState.projector(shareCaseState)).toEqual(selectedCases);
    });
  });
});
