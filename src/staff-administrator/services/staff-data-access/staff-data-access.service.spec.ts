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
      services: ['AAA7'],
      locations: [],
      userType: '',
      jobTitle: '',
      skills: [],
      roles: []
    });
    expect(mockHttpService.get).toHaveBeenCalledTimes(1);
  });

  it('getUsersByPartialName should make a GET API call', () => {
    const service = new StaffDataAccessService(mockHttpService);
    service.getUsersByPartialName('Kevin');
    expect(mockHttpService.get).toHaveBeenCalledTimes(2);
  });

  it('getStaffRefUserDetails should make a GET API call', () => {
    const service = new StaffDataAccessService(mockHttpService);
    service.getStaffRefUserDetails(1);
    expect(mockHttpService.get).toHaveBeenCalledTimes(3);
  });
});

