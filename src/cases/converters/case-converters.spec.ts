import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';
import * as converts from 'src/cases/converters/case-converter';

describe('case converters', () => {
  let selectedCases = [];
  beforeEach(() => {
    selectedCases = [{
      case_id: '1',
      case_fields: {
      }
    }, {
      case_id: '2',
      case_fields: {
      }
    }];
  });
  it('should convert the share case', () => {
    const expectedShareCases = [{caseId: '1', caseTitle: ''}, {caseId: '2', caseTitle: ''}];
    const shareCases: SharedCase[] = converts.toShareCaseConverter(selectedCases);
    expect(shareCases).toEqual(expectedShareCases);
  });
  afterEach(() => {
    selectedCases = [];
  });
});
