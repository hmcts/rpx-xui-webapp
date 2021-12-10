import { ListConstants } from '../components/constants';
import { SearchCaseRequest, CaseSearchParameters } from '../models/dtos';
import { ACTION, WorkAllocationCaseService } from './work-allocation-case.service';

describe('WorkAllocation', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);

  describe('WorkAllocationCaseService', () => {
    it('should be Truthy', () => {
      const service = new WorkAllocationCaseService(mockHttpService);
      expect(service).toBeTruthy();
    });

    it('getCase should make correct api call', () => {
      const service = new WorkAllocationCaseService(mockHttpService);
      service.getCase('123456');
      expect(mockHttpService.get).toHaveBeenCalledWith('/workallocation2/case/123456');
    });

    it('getActionUrl should correctly format the url', () => {
      const service = new WorkAllocationCaseService(mockHttpService);
      const url = service.getActionUrl('123456', ACTION.ASSIGN);
      expect(url).toEqual('/workallocation2/case/123456/assign');
    });

    it('assignCase should make correct api call', () => {
      const service = new WorkAllocationCaseService(mockHttpService);
      const user = {id: 'id1'};
      service.assignCase('123456', user);
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation2/case/123456/assign', user);
    });

    it('completeCase should make correct api call', () => {
      const service = new WorkAllocationCaseService(mockHttpService);
      service.completeCase('123456');
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation2/case/123456/complete', {});
    });

    it('cancelCase should make correct api call', () => {
      const service = new WorkAllocationCaseService(mockHttpService);
      service.cancelCase('123456');
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation2/case/123456/cancel', {});
    });

    it('claimCase should make correct api call', () => {
      const service = new WorkAllocationCaseService(mockHttpService);
      service.claimCase('123456');
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation2/case/123456/claim', {});
    });

    it('unclaimCase should make correct api call', () => {
      const service = new WorkAllocationCaseService(mockHttpService);
      service.unclaimCase('123456');
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation2/case/123456/unclaim', {});
    });

    it('postCase should make correct api call', () => {
      const service = new WorkAllocationCaseService(mockHttpService);
      const searchParam = {} as CaseSearchParameters;
      service.postCase(searchParam);
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation2/case', searchParam);
    });

    it('searchCase should make correct api call', () => {
      const service = new WorkAllocationCaseService(mockHttpService);
      const searchRequest = {} as SearchCaseRequest;
      const view = ListConstants.View.MyCases;
      service.searchCase({ searchRequest, view });
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation2/case', { searchRequest, view });
    });
  });
});
