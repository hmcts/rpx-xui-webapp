import { SearchService } from './search.service';

describe('Search Service', () => {
  let service: SearchService;
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['get']);

  beforeEach(() => {
    service = new SearchService(mockHttpService);
  });

  it('should be truthy', () => {
    expect(service).toBeTruthy();
  });

  it('should get results', async () => {
    service.getResults();
    expect(mockHttpService.get).toHaveBeenCalledWith('');
  });
});
