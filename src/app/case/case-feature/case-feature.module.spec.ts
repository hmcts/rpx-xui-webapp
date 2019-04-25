import { CaseFeatureModule } from './case-feature.module';

describe('CaseFeatureModule', () => {
  let caseFeatureModule: CaseFeatureModule;

  beforeEach(() => {
    caseFeatureModule = new CaseFeatureModule();
  });

  it('should create an instance', () => {
    expect(caseFeatureModule).toBeTruthy();
  });
});
