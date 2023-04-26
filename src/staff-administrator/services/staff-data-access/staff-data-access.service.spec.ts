import { HttpClient } from '@angular/common/http';
import {
  StaffDataFilterService
} from '../../components/staff-users/services/staff-data-filter/staff-data-filter.service';

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
      advancedSearchFilters: {
        serviceCode: ['AAA7'],
        location: ['Location 1'],
        userType: '',
        jobTitle: '',
        skill: ['Skill 1'],
        role: ['Role 1']
      },
      pageSize: StaffDataFilterService.PAGE_SIZE,
      pageNumber: 1
    });
    expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
  });

  it('getUsersByPartialName should make a GET API call', () => {
    service.getUsersByPartialName({ partialName: 'Kevin', pageSize: 1, pageNumber: 1 });
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

