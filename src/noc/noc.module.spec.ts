import { NocModule } from './noc.module';

describe('NocModule', () => {
  let nocFeatureModule: NocModule;

  beforeEach(() => {
    nocFeatureModule = new NocModule(null);
  });

  it('should create an instance', () => {
    expect(nocFeatureModule).toBeTruthy();
  });
});
