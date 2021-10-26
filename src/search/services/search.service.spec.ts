import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';

describe('Search Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SearchService
      ]
    });
  });

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

  it('should get global search services', inject([HttpTestingController, SearchService], (httpMock: HttpTestingController, service: SearchService) => {
    service.getServices().subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne('api/globalsearch/services');
    expect(req.request.method).toEqual('GET');
    req.flush(null);
  }));
});
