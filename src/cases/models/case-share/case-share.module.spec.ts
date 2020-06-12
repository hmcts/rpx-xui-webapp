import { CaseShareModule } from './case-share.module';

describe('CaseShareModule', () => {
  let caseShareModule: CaseShareModule;

  beforeEach(() => {
    caseShareModule = new CaseShareModule();
  });

  it('should create an instance', () => {
    expect(caseShareModule).toBeTruthy();
  });
});
