import { LocationDataService } from './location-data.service';

describe('WorkAllocation service', () => {
    const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);

    it('should be Truthy', () => {
      const workAllocationService = new LocationDataService(mockHttpService);
      expect(workAllocationService).toBeTruthy();
    });

    it('getLocations', () => {
      const workAllocationService = new LocationDataService(mockHttpService);
      workAllocationService.getLocations();
      expect(mockHttpService.get).toHaveBeenCalledWith(LocationDataService.locationUrl);
    });

    it('getLocation', () => {
      const workAllocationService = new LocationDataService(mockHttpService);
      workAllocationService.getLocation('location123');
      expect(mockHttpService.get).toHaveBeenCalledWith(`${LocationDataService.locationUrl}/location123`);
    });
});
