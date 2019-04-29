import { CaseManifestModule } from './case-manifest.module';

describe('CaseManifestModule', () => {
  let caseManifestModule: CaseManifestModule;

  beforeEach(() => {
    caseManifestModule = new CaseManifestModule();
  });

  it('should create an instance', () => {
    expect(caseManifestModule).toBeTruthy();
  });
});
