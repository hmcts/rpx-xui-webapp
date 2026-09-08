import { UserService } from './user.service';

describe('User service', () => {
  const mockedHttpClient = jasmine.createSpyObj('mockedHttpClient', ['get']);
  const sessionStorageService = jasmine.createSpyObj('sessionStorageService', {
    getItem: '{"id":"ID"}',
  });

  it('should get user details', () => {
    const service = new UserService(mockedHttpClient, sessionStorageService);
    service.getUserDetails();
    expect(mockedHttpClient.get).toHaveBeenCalled();
  });

  it('should extract user info from the session', () => {
    const service = new UserService(mockedHttpClient, sessionStorageService);

    const userInfo = service.getUserInfo();

    expect(sessionStorageService.getItem).toHaveBeenCalledWith('userDetails');
    expect(userInfo.id).toBe('ID');
  });
});
