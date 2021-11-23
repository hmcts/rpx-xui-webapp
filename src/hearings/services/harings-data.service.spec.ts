import { HearingsDataService } from './hearings-data.service';

describe('WorkAllocation service', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
  describe('CaseworkerDataService', () => {

    it('getForService should make correct api call', () => {
      const service = new HearingsDataService(mockHttpService);
      service.getPriorities();
      expect(mockHttpService.get).toHaveBeenCalledWith(`api/hearings/getRefData?category=Priority&service=SSCS`);
    });

  });
});
