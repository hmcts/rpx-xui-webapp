import {HttpParams} from '@angular/common/http';
import { HearingCategory } from '../models/hearings.enum';
import { LovRefDataService } from './lov-ref-data.service';

describe('Lov RefData service', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
  describe('LovRefDataService', () => {
    it('getForService should make correct api call', () => {
      const service = new LovRefDataService(mockHttpService);
      service.getListOfValues(HearingCategory.Priority, 'BBA3', false);

      const options = {
        params: new HttpParams()
          .set('category', HearingCategory.Priority)
          .set('service', 'BBA3')
          .set('isChildRequired', 'N')
      };

      expect(mockHttpService.get).toHaveBeenCalledWith(`api/prd/lov/getLovRefData`, options);
    });
  });
});
