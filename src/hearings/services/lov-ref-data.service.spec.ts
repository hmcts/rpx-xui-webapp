import { HearingCategory } from '../models/hearings.enum';
import { LovRefDataService } from './lov-ref-data.service';

describe('Lov RefData service', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
  describe('LovRefDataService', () => {
    it('getForService should make correct api call', () => {
      const service = new LovRefDataService(mockHttpService);
      service.getListOfValues(HearingCategory.Priority, 'SSCS');
      expect(mockHttpService.get).toHaveBeenCalledWith(`api/prd/lov/getLovRefData?category=Priority&service=SSCS`);
    });
  });
});
