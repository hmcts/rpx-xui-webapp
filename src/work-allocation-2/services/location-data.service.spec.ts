import { of } from 'rxjs/internal/observable/of';
import { LocationDataService } from './location-data.service';

describe('WorkAllocation', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post'])
  mockHttpService.get.and.returnValue(of(null));
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem', 'setItem']);

  describe('LocationDataService', () => {
    it('should be Truthy', () => {
      const service = new LocationDataService(mockHttpService, mockSessionStorageService);
      expect(service).toBeTruthy();
    });

    it('getLocations should make correct api call', () => {
      const service = new LocationDataService(mockHttpService, mockSessionStorageService);
      service.getLocations();
      expect(mockHttpService.get).toHaveBeenCalledWith(LocationDataService.locationUrl);
    });

    it('getLocation should make correct api call', () => {
      const service = new LocationDataService(mockHttpService, mockSessionStorageService);
      service.getLocation('location123');
      expect(mockHttpService.get).toHaveBeenCalledWith(`${LocationDataService.locationUrl}/location123`);
    });
  });
});
