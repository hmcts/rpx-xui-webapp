import { HearingsModule } from './hearings.module';

describe('HearingsModule', () => {
  let hearingsFeatureModule: HearingsModule;

  beforeEach(() => {
    hearingsFeatureModule = new HearingsModule(null);
  });

  it('should create an instance', () => {
    expect(hearingsFeatureModule).toBeTruthy();
  });
});
