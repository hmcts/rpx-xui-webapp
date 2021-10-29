import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalSearchService } from '../../../api/interfaces/globalSearchService';
import { SearchRequest, SearchResult } from '../models';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private readonly http: HttpClient) { }

  public getServices(): Observable<GlobalSearchService[]> {
    return this.http.get<GlobalSearchService[]>(`api/globalsearch/services`);
  }

  public getResults(requestBody: SearchRequest): Observable<SearchResult> {
    return this.http.post<SearchResult>(`api/globalsearch/results`, requestBody);
  }

  public storeState(id: string, value: any): void {
    window.sessionStorage.setItem(id, JSON.stringify(value));
  }

  public retrieveState(id: string): any {
    return window.sessionStorage.getItem(id) ? JSON.parse(window.sessionStorage.getItem(id)) : null;
  }
}
