import { StaffDataAccessService } from './staff-data-access.service';

describe('StaffDataAccessService', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);

  it('should be Truthy', () => {
    const service = new StaffDataAccessService(mockHttpService);
    expect(service).toBeTruthy();
  });

  it('getFilteredUsers should make a POST API call', () => {
    const service = new StaffDataAccessService(mockHttpService);
    service.getFilteredUsers({
      services: [],
      locations: [],
      userType: '',
      jobTitle: '',
      skills: [],
      roles: []
    });
    expect(mockHttpService.post).toHaveBeenCalledTimes(1);
  });

  it('getUsersByPartialName should make a GET API call', () => {
    const service = new StaffDataAccessService(mockHttpService);
    service.getUsersByPartialName('Kevin');
    expect(mockHttpService.get).toHaveBeenCalledTimes(1);
  });
});

