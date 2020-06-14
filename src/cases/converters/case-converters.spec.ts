import * as converts from 'src/cases/converters/case-converter';
import {SharedCase} from '../models/case-share/case-share.module';

describe('case converters', () => {
  it('should convert the share case', () => {
    const selectedCases = [{
      case_id: '1',
      case_fields: {
        solsSolicitorAppReference: 'James123'
      }
    }, {
      case_id: '2',
      case_fields: {
        solsSolicitorAppReference: 'Steve321'
      }
    }];
    const expectedShareCases = [{caseId: '1', caseTitle: 'James123'}, {caseId: '2', caseTitle: 'Steve321'}];
    const shareCases: SharedCase[] = converts.toShareCaseConverter(selectedCases);
    expect(shareCases).toEqual(expectedShareCases);
  });
});
