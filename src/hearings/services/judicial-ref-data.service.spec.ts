import { JudicialRefDataService } from './judicial-ref-data.service';

// Check testing
describe('Judicial RefData service', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
  // Check testing
describe('JudicialRefDataService', () => {
    it('searchJudicialUserByPersonalCodes should make correct api call', () => {
      const personalCodes = ['p100000', 'p100001'];
      const service = new JudicialRefDataService(mockHttpService);
      service.searchJudicialUserByPersonalCodes(personalCodes);
      expect(mockHttpService.post).toHaveBeenCalledWith('api/prd/judicial/searchJudicialUserByPersonalCodes', {personal_code: personalCodes});
    });
  });
});
