import { LocationDataService } from './location-data.service';

// Check testing
describe('WorkAllocation', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);

  // Check testing
describe('LocationDataService', () => {
    it('should be Truthy', () => {
      const service = new LocationDataService(mockHttpService);
      expect(service).toBeTruthy();
    });

    it('getLocations should make correct api call', () => {
      const service = new LocationDataService(mockHttpService);
      service.getLocations();
      expect(mockHttpService.get).toHaveBeenCalledWith(LocationDataService.locationUrl);
    });

    it('getLocation should make correct api call', () => {
      const service = new LocationDataService(mockHttpService);
      service.getLocation('location123');
      expect(mockHttpService.get).toHaveBeenCalledWith(`${LocationDataService.locationUrl}/location123`);
    });
  });
});
