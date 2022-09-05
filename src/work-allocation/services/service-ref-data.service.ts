import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceRefData } from '../models/common';

@Injectable({ providedIn: 'root' })
export class ServiceRefDataService {
  public static refDataUrl: string = '/api/service-ref-data/get';
  public constructor(private readonly http: HttpClient) {}

  public getServiceRefData(): Observable<ServiceRefData[]> {
    return this.http.get<ServiceRefData[]>(ServiceRefDataService.refDataUrl);
  }
}
