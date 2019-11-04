import { CasesModule } from './cases.module';

describe('CasesModule', () => {
  let caseFeatureModule: CasesModule;

  beforeEach(() => {
    caseFeatureModule = new CasesModule();
  });

  it('should create an instance', () => {
    expect(caseFeatureModule).toBeTruthy();
  });
});
