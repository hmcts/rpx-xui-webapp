import { CaseworkerDataService } from './caseworker-data.service';

describe('WorkAllocation service', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
  describe('CaseworkerDataService', () => {
    it('should be Truthy', () => {
      const service = new CaseworkerDataService(mockHttpService);
      expect(service).toBeTruthy();
    });

    it('getUserByIdamId should make correct api call', () => {
      const service = new CaseworkerDataService(mockHttpService);
      service.getUserByIdamId('123456');
      expect(mockHttpService.post).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/getUserByIdamId`, {
        idamId: '123456',
        silentNotFound: false,
      });
    });

    it('getUserByIdamId should support silent not found', () => {
      const service = new CaseworkerDataService(mockHttpService);
      service.getUserByIdamId('123456', true);
      expect(mockHttpService.post).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/getUserByIdamId`, {
        idamId: '123456',
        silentNotFound: true,
      });
    });
  });
});
