import { HearingCategory } from '../models/hearings.enum';
import { LocationsDataService } from './locations-data.service';
import { LovRefDataService } from './lov-ref-data.service';

describe('LocationsData service', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
  describe('LocationsData', () => {
    it('getForService should make correct api call', () => {
      const service = new LocationsDataService(mockHttpService);
      service.getCourtLocations('venue');
      expect(mockHttpService.get).toHaveBeenCalledWith(`api/prd/location/getCourtLocations?epimms_id=venue`);
    });
  });
});
