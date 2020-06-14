import {SharedCase} from './case-share.module';

describe('CaseShareModule', () => {
  let caseShareModule: SharedCase;

  beforeEach(() => {
    caseShareModule = {caseId: '1', caseTitle: 'Pete123'};
  });

  it('should create an instance', () => {
    expect(caseShareModule).toBeTruthy();
  });
});
