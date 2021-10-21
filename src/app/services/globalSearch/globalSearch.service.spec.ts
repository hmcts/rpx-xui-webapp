import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GlobalSearchService } from './globalSearch.service';

describe('Global Search Service', () => {
  let httpClientGetSpy: { get: jasmine.Spy };
  let service: GlobalSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        GlobalSearchService
      ]
    });

    httpClientGetSpy = jasmine.createSpyObj('HttpClient', ['get']);
  });

  it('should have configuration service', () => {
    service = TestBed.get(GlobalSearchService);
    expect(service).toBeTruthy();
  });

  it('should get global search jurisdictions', () => {
    httpClientGetSpy.get.and.returnValue({});
    service.getGlobalSearchServices().subscribe(data => {
      expect(data).toBeDefined();
    });
  });
});
