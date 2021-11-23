import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalSearchService } from '../../../api/interfaces/globalSearchService';
import { SearchStatePersistenceKey } from '../enums';
import { SearchParameters, SearchRequest, SearchRequestCriteria, SearchResult } from '../models';

@Injectable({ providedIn: 'root' })
export class SearchService {
  public readonly RECORD_PAGE_SIZE = 25;

  constructor(private readonly http: HttpClient) { }

  public getServices(): Observable<GlobalSearchService[]> {
    return this.http.get<GlobalSearchService[]>(`api/globalsearch/services`);
  }

  public getResults(): Observable<SearchResult> {
    const searchParameters = this.retrieveState(SearchStatePersistenceKey.SEARCH_PARAMS);
    const searchRequestCriteria = searchParameters ? this.mapSearchParametersToRequestCriteria(searchParameters) : null;
    const startRecord = this.retrieveState(SearchStatePersistenceKey.START_RECORD);
    const searchRequest: SearchRequest = {
      searchCriteria: searchRequestCriteria,
      sortCriteria: null,
      maxReturnRecordCount: this.RECORD_PAGE_SIZE,
      startRecordNumber: startRecord ? parseInt(startRecord, 10) : 1
    };

    return this.http.post<SearchResult>(`api/globalsearch/results`, searchRequest);
  }

  public storeState(key: string, value: any): void {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  public retrieveState(key: string): any {
    return window.sessionStorage.getItem(key) ? JSON.parse(window.sessionStorage.getItem(key)) : null;
  }

  public decrementStartRecord(): number {
    const startRecord: number = this.retrieveState(SearchStatePersistenceKey.START_RECORD);
    if (startRecord !== null) {
      // Need to be able to decrement start record even if current value is less than or equal to record page size
      const newStartRecord = Math.max(startRecord - this.RECORD_PAGE_SIZE, 1);
      this.storeState(SearchStatePersistenceKey.START_RECORD, newStartRecord);
      return newStartRecord;
    }
    // Return default value of 1 if start record cannot be retrieved
    return 1;
  }

  public incrementStartRecord(): number {
    const startRecord: number = this.retrieveState(SearchStatePersistenceKey.START_RECORD);
    if (startRecord !== null && startRecord >= 1) {
      const newStartRecord = startRecord + this.RECORD_PAGE_SIZE;
      this.storeState(SearchStatePersistenceKey.START_RECORD, newStartRecord);
      return newStartRecord;
    }
    // Return original start record or 1 as a default, if it cannot be retrieved
    return startRecord !== null ? startRecord : 1;
  }

  private mapSearchParametersToRequestCriteria(searchParameters: SearchParameters): SearchRequestCriteria {
    return {
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
    };
  }
}
