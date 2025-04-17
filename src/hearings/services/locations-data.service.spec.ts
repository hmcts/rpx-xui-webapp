import { LocationsDataService } from './locations-data.service';

describe('LocationsData service', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
  describe('LocationsData', () => {
    it('getForService should make correct api call', () => {
      const service = new LocationsDataService(mockHttpService);
      service.getLocationById('venue', 'serviceCode');
      expect(mockHttpService.get).toHaveBeenCalledWith('api/prd/location/getLocationById?epimms_id=venue&serviceCode=serviceCode');
    });
  });
});
