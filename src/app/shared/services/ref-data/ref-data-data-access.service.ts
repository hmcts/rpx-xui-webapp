import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RefDataService } from './models/ref-data-service.model';

@Injectable({
  providedIn: 'root'
})
export class RefDataDataAccessService {
  public static refDataUrl: string = '/api/ref-data';
  public constructor(private readonly http: HttpClient) {}

  public getServicesRefData(): Observable<RefDataService[]> {
    return this.http.get<RefDataService[]>(`${RefDataDataAccessService.refDataUrl}/services`);
  }
}
