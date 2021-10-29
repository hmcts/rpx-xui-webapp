import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';

describe('Search Service', () => {
  let mockSessionStorage: any;

  beforeEach(() => {
    const store = {};
    mockSessionStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      }
    };
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

  it('should store state in session storage', inject([SearchService], (service: SearchService) => {
    spyOn(window.sessionStorage, 'setItem');
    service.storeState('test', 'state');
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('test', JSON.stringify('state'));
  }));

  it('should retrieve state from session storage', inject([SearchService], (service: SearchService) => {
    const item = {
      field1: 'Abc',
      field2: '123'
    };
    mockSessionStorage.setItem('test', JSON.stringify(item));
    spyOn(window.sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    const state = service.retrieveState('test');
    expect(window.sessionStorage.getItem).toHaveBeenCalledWith('test');
    expect(state).toEqual(item);
  }));
});
