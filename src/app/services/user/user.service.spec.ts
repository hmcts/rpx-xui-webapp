import { UserService } from './user.service';

describe('User service', () => {
  const mockedHttpClient = jasmine.createSpyObj('mockedHttpClient', ['get']);
  it('should get user details', () => {
    const service = new UserService(mockedHttpClient);
    service.getUserDetails();
    expect(mockedHttpClient.get).toHaveBeenCalled();
  });
});
