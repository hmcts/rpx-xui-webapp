import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HMCTSDetailsService } from '../../app/models';

@Injectable()
export class WASupportedJurisdictionsService {
  public static jurisdictionUrl: string = '/api/wa-supported-jurisdiction';
  public constructor(private readonly http: HttpClient) {}

  // Note: this will include service name
  public getDetailedWASupportedJurisdictions(): Observable<HMCTSDetailsService[]> {
    return this.http.get<HMCTSDetailsService[]>(`${WASupportedJurisdictionsService.jurisdictionUrl}/detail`);
  }

  public getWASupportedJurisdictions(): Observable<string[]> {
    return this.http.get<string[]>(`${WASupportedJurisdictionsService.jurisdictionUrl}/get`);
  }
}
