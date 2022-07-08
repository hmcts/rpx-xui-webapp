import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ServiceRefDataService {
  public static refDataUrl: string = '/api/service-ref-data/get';
  public constructor(private readonly http: HttpClient) {}

  public getServiceRefData(): Observable<string[]> {
    return this.http.get<string[]>(ServiceRefDataService.refDataUrl);
  }
}
