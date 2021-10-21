import { SearchService } from './search.service';

describe('Search Service', () => {
  let service: SearchService;
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['post']);

  beforeEach(() => {
    service = new SearchService(mockHttpService);
  });

  it('should be truthy', () => {
    expect(service).toBeTruthy();
  });

  it('should get global search jurisdictions', () => {
    mockHttpService.get.and.returnValue({});
    service.getServices().subscribe(data => {
      expect(data).toBeDefined();
    });
  });

  // it('should get results', async () => {
  //   service.getResults();
  //   expect(mockHttpService.post).toHaveBeenCalledWith('');
  // });
});
