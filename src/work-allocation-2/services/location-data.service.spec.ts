import { of } from 'rxjs';
import { LocationDataService } from './location-data.service';

// Check testing
describe('WorkAllocation', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
  const sessionStorageService = jasmine.createSpyObj('sessionStorageService', ['getItem']);

  // Check testing
describe('LocationDataService', () => {
    it('should be Truthy', () => {
      const service = new LocationDataService(mockHttpService, sessionStorageService);
      expect(service).toBeTruthy();
    });

    it('getLocations should make correct api call', () => {
      const service = new LocationDataService(mockHttpService, sessionStorageService);
      sessionStorageService.getItem.and.returnValue(null);
      mockHttpService.get.and.returnValue(of([]));
      service.getLocations();
      expect(mockHttpService.get).toHaveBeenCalledWith(LocationDataService.locationUrl);
    });

    it('getLocation should make correct api call', () => {
      const service = new LocationDataService(mockHttpService, sessionStorageService);
      service.getLocation('location123');
      expect(mockHttpService.get).toHaveBeenCalledWith(`${LocationDataService.locationUrl}/location123`);
    });
  });
});
