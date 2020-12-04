import { CaseworkerDataService } from './caseworker-data.service';

describe('WorkAllocation service', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);

  describe('CaseworkerDataService', () => {
    it('should be Truthy', () => {
      const service = new CaseworkerDataService(mockHttpService);
      expect(service).toBeTruthy();
    });

    it('getAll should make correct api call', () => {
      const service = new CaseworkerDataService(mockHttpService);
      service.getAll();
      expect(mockHttpService.get).toHaveBeenCalledWith(CaseworkerDataService.caseWorkerUrl);
    });

    it('getForLocation should make correct api call', () => {
      const service = new CaseworkerDataService(mockHttpService);
      service.getForLocation('location123');
      expect(mockHttpService.get).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/location/location123`);
    });

    it('getForService should make correct api call', () => {
      const service = new CaseworkerDataService(mockHttpService);
      service.getForService('service1');
      expect(mockHttpService.get).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/service/service1`);
    });

    it('getForLocationAndService should make correct api call', () => {
      const service = new CaseworkerDataService(mockHttpService);
      service.getForLocationAndService('location123', 'service1');
      expect(mockHttpService.get).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/location/location123/service/service1`);
    });

    it('search should make correct api call', () => {
      const service = new CaseworkerDataService(mockHttpService);
      service.search('searchTerm');
      expect(mockHttpService.post).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/search`, { term: 'searchTerm' });
    });

    it('getDetails should make correct api call', () => {
      const service = new CaseworkerDataService(mockHttpService);
      service.getDetails('123456');
      expect(mockHttpService.get).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/123456`);
    });
  })
});
