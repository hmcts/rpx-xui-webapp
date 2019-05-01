import { CaseFeatureModule } from './case-feature.module';

describe('CaseFeatureModule', () => {
  let caseFeatureModule: CaseFeatureModule;

  beforeEach(() => {
    caseFeatureModule = new CaseFeatureModule();
  });

  xit('should create an instance', () => {
    expect(caseFeatureModule).toBeTruthy();
  });
});
