import { HearingsModule } from './hearings.module';

// Check testing
describe('HearingsModule', () => {
  let hearingsFeatureModule: HearingsModule;

  beforeEach(() => {
    hearingsFeatureModule = new HearingsModule(null);
  });

  it('should create an instance', () => {
    expect(hearingsFeatureModule).toBeTruthy();
  });
});
