import { UserDetailsModule } from './user-details.module';

describe('UserDetailsModule', () => {
  let userDetailsModule: UserDetailsModule;

  beforeEach(() => {
    userDetailsModule = new UserDetailsModule();
  });

  it('should create an instance', () => {
    expect(userDetailsModule).toBeTruthy();
  });
});
