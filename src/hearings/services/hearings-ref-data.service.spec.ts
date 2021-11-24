import { HearingPriorityType } from '../models/hearings.enum';
import { HearingsRefDataService } from './hearings-ref-data.service';

describe('Hearings Reference Data service', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
  describe('HearingsRefDataService', () => {
    it('getForService should make correct api call', () => {
      const service = new HearingsRefDataService(mockHttpService);
      service.getRefData(HearingPriorityType.Priority, HearingPriorityType.SSCS);
      expect(mockHttpService.get).toHaveBeenCalledWith(`api/hearings/getRefData?category=Priority&service=SSCS`);
    });
  });
});
