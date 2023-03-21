import { StaffDataAccessService } from './staff-data-access.service';

describe('StaffDataAccessService', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);

  it('should be Truthy', () => {
    const service = new StaffDataAccessService(mockHttpService);
    expect(service).toBeTruthy();
  });

  it('getFilteredUsers should make a GET API call', () => {
    const service = new StaffDataAccessService(mockHttpService);
    service.getFilteredUsers({
      advancedSearchFilters: {
        serviceCode: ['AAA7'],
        location: ['Location 1'],
        userType: '',
        jobTitle: '',
        skill: ['Skill 1'],
        role: ['Role 1']
      },
      pageSize: 15,
      pageNumber: 1,
    });
    expect(mockHttpService.get).toHaveBeenCalledTimes(1);
  });

  it('getUsersByPartialName should make a GET API call', () => {
    const service = new StaffDataAccessService(mockHttpService);
    service.getUsersByPartialName({ partialName: 'Kevin', pageSize: 1, pageNumber: 1 });
    expect(mockHttpService.get).toHaveBeenCalledTimes(2);
  });

  it('fetchUsersById should make a POST API call', () => {
    const service = new StaffDataAccessService(mockHttpService);
    service.fetchUsersById([1]);
    expect(mockHttpService.post).toHaveBeenCalledTimes(1);
  });
});

