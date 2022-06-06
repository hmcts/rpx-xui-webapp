import { NocModule } from './noc.module';

// Check testing
describe('NocModule', () => {
  let nocFeatureModule: NocModule;

  beforeEach(() => {
    nocFeatureModule = new NocModule(null);
  });

  it('should create an instance', () => {
    expect(nocFeatureModule).toBeTruthy();
  });
});
