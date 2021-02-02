import { CaseworkerDataService } from './case-worker-data.service';

describe('WorkAllocation service', () => {
    const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);

    it('should be Truthy', () => {
        const workAllocationService = new CaseworkerDataService(mockHttpService);
        expect(workAllocationService).toBeTruthy();
    });

    it('getAll', () => {
        const workAllocationService = new CaseworkerDataService(mockHttpService);
        workAllocationService.getAll();
        expect(mockHttpService.get).toHaveBeenCalledWith(CaseworkerDataService.caseWorkerUrl);
    });

    it('getForLocation', () => {
        const workAllocationService = new CaseworkerDataService(mockHttpService);
        workAllocationService.getForLocation('location123');
        expect(mockHttpService.get).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/location/location123`);
    });

    it('getForService', () => {
        const workAllocationService = new CaseworkerDataService(mockHttpService);
        workAllocationService.getForService('service1');
        expect(mockHttpService.get).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/service/service1`);
    });

    it('getForLocationAndService', () => {
        const workAllocationService = new CaseworkerDataService(mockHttpService);
        workAllocationService.getForLocationAndService('location123', 'service1');
        expect(mockHttpService.get).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/location/location123/service/service1`);
    });

    it('search', () => {
        const workAllocationService = new CaseworkerDataService(mockHttpService);
        workAllocationService.search('searchTerm');
        expect(mockHttpService.post).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/search`, { term: 'searchTerm' });
    });
});
