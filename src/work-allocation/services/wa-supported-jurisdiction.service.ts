import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { safeJsonParse } from '@hmcts/ccd-case-ui-toolkit';
import { Observable, of } from 'rxjs';
import { finalize, shareReplay, tap } from 'rxjs/operators';
import { HMCTSServiceDetails } from '../../app/models';
import { SessionStorageService } from '../../app/services';

@Injectable({ providedIn: 'root' })
export class WASupportedJurisdictionsService {
  public static readonly jurisdictionUrl: string = '/api/wa-supported-jurisdiction';
  public static readonly jurisdictionStorageKey: string = 'waSupportedJurisdictions_cache';
  private supportedJurisdictionsRequest$: Observable<string[]>;

  public constructor(
    private readonly http: HttpClient,
    private readonly sessionStorageService: SessionStorageService
  ) {}

  // Note: this will include service name
  public getDetailedWASupportedJurisdictions(): Observable<HMCTSServiceDetails[]> {
    return this.http.get<HMCTSServiceDetails[]>(`${WASupportedJurisdictionsService.jurisdictionUrl}/detail`);
  }

  public getWASupportedJurisdictions(): Observable<string[]> {
    const cachedJurisdictions = this.sessionStorageService.getItem(WASupportedJurisdictionsService.jurisdictionStorageKey);
    if (cachedJurisdictions) {
      const jurisdictions = safeJsonParse<string[]>(cachedJurisdictions, null);
      if (Array.isArray(jurisdictions)) {
        return of(jurisdictions);
      }
      this.sessionStorageService.removeItem(WASupportedJurisdictionsService.jurisdictionStorageKey);
    }

    if (!this.supportedJurisdictionsRequest$) {
      this.supportedJurisdictionsRequest$ = this.http
        .get<string[]>(`${WASupportedJurisdictionsService.jurisdictionUrl}/get`)
        .pipe(
          tap((jurisdictions) => {
            this.sessionStorageService.setItem(
              WASupportedJurisdictionsService.jurisdictionStorageKey,
              JSON.stringify(jurisdictions)
            );
          }),
          finalize(() => (this.supportedJurisdictionsRequest$ = null)),
          shareReplay({ bufferSize: 1, refCount: false })
        );
    }

    return this.supportedJurisdictionsRequest$;
  }
}
