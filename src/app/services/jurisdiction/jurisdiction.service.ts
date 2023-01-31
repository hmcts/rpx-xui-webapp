import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';

@Injectable()
export class JurisdictionService {

  public static jurisdictionUrl = '/aggregated/caseworkers/:uid/jurisdictions?access=read';

  constructor(private readonly http: HttpClient) {}

  public getJurisdictions(): Observable<Jurisdiction[]> {
    // Headers had to be set here as the request is going via proxy
    const headers = new HttpHeaders()
      .set('content-type', 'application/json');
    return this.http.get<Jurisdiction[]>(JurisdictionService.jurisdictionUrl, { headers });
  }
}
