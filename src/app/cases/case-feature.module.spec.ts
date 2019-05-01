import { CasesFeatureModule } from './cases-feature.module';

describe('CasesFeatureModule', () => {
  let caseFeatureModule: CasesFeatureModule;

  beforeEach(() => {
    caseFeatureModule = new CasesFeatureModule();
  });

  it('should create an instance', () => {
    expect(caseFeatureModule).toBeTruthy();
  });
});
