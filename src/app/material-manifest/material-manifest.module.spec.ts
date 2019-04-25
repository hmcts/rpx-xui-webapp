import { MaterialManifestModule } from './material-manifest.module';

describe('MaterialManifestModule', () => {
  let materialManifestModule: MaterialManifestModule;

  beforeEach(() => {
    materialManifestModule = new MaterialManifestModule();
  });

  it('should create an instance', () => {
    expect(materialManifestModule).toBeTruthy();
  });
});
