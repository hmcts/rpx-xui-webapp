import { HearingCategory } from '../models/hearings.enum';
import { LovRefDataService } from './lov-ref-data.service';

fdescribe('Lov RefData service', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
  describe('LovRefDataService', () => {
    it('getForService should make correct api call', () => {
      const service = new LovRefDataService(mockHttpService);
      service.getListOfValues(HearingCategory.Priority, 'SSCS', false);
      expect(mockHttpService.get).toHaveBeenCalledWith(`api/prd/lov/getLovRefData`, jasmine.any(Object));
      // the below fails
      // expect(mockHttpService.get).toHaveBeenCalledWith(`api/prd/lov/getLovRefData`, jasmine.objectContaining({ params: 'category=Priority&service=SSCS&isChildRequired=N' }));
    });
  });
});
