import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalSearchService } from 'api/interfaces/globalSearchService';
import { Observable } from 'rxjs';
import { SearchRequest } from '../models/search-request.model';
import { SearchResult } from '../models/search-result.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private readonly http: HttpClient) { }

  public getServices(): Observable<GlobalSearchService[]> {
    return this.http.get<GlobalSearchService[]>(`api/globalsearch/services`);
  }

  public getResults(requestBody: SearchRequest): Observable<SearchResult> {
    return this.http.post<SearchResult>(`api/globalsearch/results`, requestBody);
  }
}
