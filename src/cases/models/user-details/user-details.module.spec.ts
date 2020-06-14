import { UserDetails } from './user-details.module';

describe('UserDetailsModule', () => {
  let userDetailsModule: UserDetails;

  beforeEach(() => {
    userDetailsModule = {
      idamId: 'id123',
      firstName: 'Pete',
      lastName: 'Smith',
      email: 'pete.smith@hmcts.net'
    };
  });

  it('should create an instance', () => {
    expect(userDetailsModule).toBeTruthy();
  });
});
