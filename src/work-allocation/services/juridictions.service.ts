import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionStorageService } from '../../app/services';
import { safeJsonParse } from '@hmcts/ccd-case-ui-toolkit';

@Injectable({
  providedIn: 'root',
})
export class JurisdictionsService {
  constructor(
    private readonly http: HttpClient,
    private readonly sessionStorageService: SessionStorageService
  ) {}
  public getJurisdictions(): Observable<Jurisdiction[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    if (this.sessionStorageService.getItem('JURISDICTIONS')) {
      const jurisdictions = safeJsonParse<Jurisdiction[]>(
        this.sessionStorageService.getItem('JURISDICTIONS'),
        []
      );
      return of(jurisdictions);
    }
    return this.http
      .get<Jurisdiction[]>('/aggregated/caseworkers/:uid/jurisdictions?access=read', { headers })
      .pipe(tap((jurisdictions) => this.sessionStorageService.setItem('JURISDICTIONS', JSON.stringify(jurisdictions))));
  }
}
