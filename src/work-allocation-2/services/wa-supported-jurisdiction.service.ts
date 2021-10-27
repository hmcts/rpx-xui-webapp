import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WASupportedJurisdictionsService {
  public static jurisdictionUrl: string = '/api/supported-jurisdiction/get';
  public constructor(private readonly http: HttpClient) {}

  public getSupportedJurisdictions(): Observable<string[]> {
    return this.http.get<string[]>(WASupportedJurisdictionsService.jurisdictionUrl);
  }
}
