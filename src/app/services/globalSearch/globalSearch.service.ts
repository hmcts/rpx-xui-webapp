import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalSearchService {
  constructor(private readonly http: HttpClient) {}

  public getGlobalSearchServices(): Observable<GlobalSearchService[]> {
    return this.http.get<GlobalSearchService[]>(`api/globalsearch/services`);
  }
}
