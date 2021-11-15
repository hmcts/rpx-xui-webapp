import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GlobalSearchService } from '../../../api/interfaces/globalSearchService';
import { SearchStatePersistenceKey } from '../enums';
import { SearchParameters, SearchRequest, SearchResult } from '../models';
import { SearchService } from './search.service';

describe('Search Service', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;
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
    // Note: TestBed.get() is deprecated in favour of TestBed.inject() (type-safe) from Angular 9
    service = TestBed.get(SearchService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no HTTP requests are outstanding
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get global search services', () => {
    const dummyResponse: GlobalSearchService[] = [
      {serviceId: 'TEST', serviceName: 'Test service'}
    ];
    service.getServices().subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('api/globalsearch/services');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyResponse);
  });

  it('should store state in session storage', () => {
    spyOn(window.sessionStorage, 'setItem');
    service.storeState('test', 'state');
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('test', JSON.stringify('state'));
  });

  it('should retrieve state from session storage', () => {
    const item = {
      field1: 'Abc',
      field2: '123'
    };
    mockSessionStorage.setItem('test', JSON.stringify(item));
    spyOn(window.sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    const state = service.retrieveState('test');
    expect(window.sessionStorage.getItem).toHaveBeenCalledWith('test');
    expect(state).toEqual(item);
  });

  it('should get results for specified search parameters', () => {
    const searchParameters: SearchParameters = {
      caseReferences: ['1234123412341234'],
      CCDJurisdictionIds: ['TEST'],
      otherReferences: ['Abc'],
      fullName: 'Test test',
      address: '102 Petty France',
      postcode: 'SW1H 9AJ',
      emailAddress: 'test@example.com',
      dateOfBirth: '1980-10-1',
      dateOfDeath: '2020-2-2'
    };
    const serviceSpy = spyOn(service, 'retrieveState').and.callFake((key: string) => {
      if (key === SearchStatePersistenceKey.SEARCH_PARAMS) {
        return searchParameters;
      } else if (key === SearchStatePersistenceKey.START_RECORD) {
        return '1';
      }
    });
    const searchRequest: SearchRequest = {
      searchCriteria: {
        CCDCaseTypeIds: null,
        CCDJurisdictionIds: searchParameters.CCDJurisdictionIds,
        caseManagementBaseLocationIds: null,
        caseManagementRegionIds: null,
        caseReferences: searchParameters.caseReferences,
        otherReferences: searchParameters.otherReferences,
        parties: [{
          addressLine1: searchParameters.address,
          dateOfBirth: searchParameters.dateOfBirth,
          dateOfDeath: searchParameters.dateOfDeath,
          emailAddress: searchParameters.emailAddress,
          partyName: searchParameters.fullName,
          postCode: searchParameters.postcode
        }],
        stateIds: null
      },
      sortCriteria: null,
      maxReturnRecordCount: service.MAX_RECORD_PAGE_SIZE,
      startRecordNumber: 1
    };
    const dummySearchResult: SearchResult = {
      resultInfo : null,
      results: [null, null]
    };

    service.getResults().subscribe(result => {
      expect(result).toEqual(dummySearchResult);
    });

    expect(serviceSpy).toHaveBeenCalledTimes(2);
    expect(serviceSpy.calls.all()[0].args[0]).toEqual(SearchStatePersistenceKey.SEARCH_PARAMS);
    expect(serviceSpy.calls.all()[1].args[0]).toEqual(SearchStatePersistenceKey.START_RECORD);

    const req = httpMock.expectOne('api/globalsearch/results');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(searchRequest);
    req.flush(dummySearchResult);
  });

  it('should decrement the starting record number if it exists in the session store and is greater than the max record page size', () => {
    mockSessionStorage.setItem(SearchStatePersistenceKey.START_RECORD, service.MAX_RECORD_PAGE_SIZE + 1);
    spyOn(service, 'retrieveState').and.callThrough();
    spyOn(window.sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(service, 'storeState').and.callThrough();
    spyOn(window.sessionStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
    service.decrementStartRecord();
    expect(service.retrieveState).toHaveBeenCalledWith(SearchStatePersistenceKey.START_RECORD);
    expect(window.sessionStorage.getItem).toHaveBeenCalledWith(SearchStatePersistenceKey.START_RECORD);
    // The start record is expected to be 1, having been decremented by the max record page size
    expect(service.storeState).toHaveBeenCalledWith(SearchStatePersistenceKey.START_RECORD, 1);
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(SearchStatePersistenceKey.START_RECORD, '1');
  });

  it('should not decrement the starting record number if it is not greater than the max record page size', () => {
    mockSessionStorage.setItem(SearchStatePersistenceKey.START_RECORD, service.MAX_RECORD_PAGE_SIZE);
    spyOn(service, 'retrieveState').and.callThrough();
    spyOn(window.sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(service, 'storeState').and.callThrough();
    service.decrementStartRecord();
    expect(service.retrieveState).toHaveBeenCalledWith(SearchStatePersistenceKey.START_RECORD);
    expect(window.sessionStorage.getItem).toHaveBeenCalledWith(SearchStatePersistenceKey.START_RECORD);
    expect(service.storeState).not.toHaveBeenCalled();
  });

  it('should not decrement the starting record number if it does not exist in the session store', () => {
    spyOn(service, 'retrieveState').and.callThrough();
    spyOn(window.sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(service, 'storeState').and.callThrough();
    service.decrementStartRecord();
    expect(service.retrieveState).toHaveBeenCalledWith(SearchStatePersistenceKey.START_RECORD);
    expect(window.sessionStorage.getItem).toHaveBeenCalledWith(SearchStatePersistenceKey.START_RECORD);
    expect(service.storeState).not.toHaveBeenCalled();
  });

  it('should increment the starting record number if it exists in the session store and is greater than or equal to 1', () => {
    mockSessionStorage.setItem(SearchStatePersistenceKey.START_RECORD, 1);
    spyOn(service, 'retrieveState').and.callThrough();
    spyOn(window.sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(service, 'storeState').and.callThrough();
    spyOn(window.sessionStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
    service.incrementStartRecord();
    expect(service.retrieveState).toHaveBeenCalledWith(SearchStatePersistenceKey.START_RECORD);
    expect(window.sessionStorage.getItem).toHaveBeenCalledWith(SearchStatePersistenceKey.START_RECORD);
    // The start record is expected to be 1 + max record page size, having been incremented by the max record page size
    expect(service.storeState).toHaveBeenCalledWith(SearchStatePersistenceKey.START_RECORD, 1 + service.MAX_RECORD_PAGE_SIZE);
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
      SearchStatePersistenceKey.START_RECORD, (1 + service.MAX_RECORD_PAGE_SIZE).toString());
  });

  it('should not increment the starting record number if it is less than 1', () => {
    mockSessionStorage.setItem(SearchStatePersistenceKey.START_RECORD, 0);
    spyOn(service, 'retrieveState').and.callThrough();
    spyOn(window.sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(service, 'storeState').and.callThrough();
    service.incrementStartRecord();
    expect(service.retrieveState).toHaveBeenCalledWith(SearchStatePersistenceKey.START_RECORD);
    expect(window.sessionStorage.getItem).toHaveBeenCalledWith(SearchStatePersistenceKey.START_RECORD);
    expect(service.storeState).not.toHaveBeenCalled();
  });

  it('should not increment the starting record number if it does not exist in the session store', () => {
    spyOn(service, 'retrieveState').and.callThrough();
    spyOn(window.sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(service, 'storeState').and.callThrough();
    service.incrementStartRecord();
    expect(service.retrieveState).toHaveBeenCalledWith(SearchStatePersistenceKey.START_RECORD);
    expect(window.sessionStorage.getItem).toHaveBeenCalledWith(SearchStatePersistenceKey.START_RECORD);
    expect(service.storeState).not.toHaveBeenCalled();
  });
});
