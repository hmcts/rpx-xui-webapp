import { HttpClient } from '@angular/common/http';
import { StaffDataAccessService } from './staff-data-access.service';

describe('StaffDataAccessService', () => {
  let service: StaffDataAccessService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('mockHttpClient', ['put', 'get', 'post']);
    service = new StaffDataAccessService(mockHttpClient);
  });

  it('should be Truthy', () => {
    expect(service).toBeTruthy();
  });

  it('getFilteredUsers should make a GET API call', () => {
    service.getFilteredUsers({
      services: ['AAA7'],
      locations: [],
      userType: '',
      jobTitle: '',
      skills: [],
      roles: []
    });
    expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
  });

  it('getUsersByPartialName should make a GET API call', () => {
    service.getUsersByPartialName('Kevin');
    expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
  });

  it('fetchUsersById should make a POST API call', () => {
    service.fetchUsersById(['user-id-1', 'user-id-2']);
    expect(mockHttpClient.post).toHaveBeenCalledTimes(1);
  });

  it('fetchSingleUserById should make a GET API call', () => {
    service.fetchSingleUserById('user-id-1');
    expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
  });
});

