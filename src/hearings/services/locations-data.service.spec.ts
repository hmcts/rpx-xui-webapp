import { HttpParams } from '@angular/common/http';
import { LocationsDataService } from './locations-data.service';

describe('LocationsData service', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
  describe('LocationsData', () => {
    it('getForService should make correct api call', () => {
      const service = new LocationsDataService(mockHttpService);
      service.getLocationById('venue', 'serviceCode');
      const query = { params: new HttpParams().set('serviceCode', 'serviceCode') };
      expect(mockHttpService.get).toHaveBeenCalledWith('api/prd/location/getLocationById?epimms_id=venue', query);
    });
  });
});
