import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { safeJsonParse } from '@hmcts/ccd-case-ui-toolkit';
import { asyncScheduler, Observable, scheduled } from 'rxjs';
import { catchError, finalize, shareReplay, tap } from 'rxjs/operators';
import { HMCTSServiceDetails } from '../../app/models';
import { SessionStorageService } from '../../app/services';
import { LoggerService } from '../../app/services/logger/logger.service';
import { logAndRethrow } from './work-allocation-error.utils';

@Injectable({ providedIn: 'root' })
export class WASupportedJurisdictionsService {
  public static readonly jurisdictionUrl: string = '/api/wa-supported-jurisdiction';
  public static readonly jurisdictionStorageKey: string = 'waSupportedJurisdictions_cache';
  private supportedJurisdictionsRequest$: Observable<string[]> | null = null;

  public constructor(
    private readonly http: HttpClient,
    private readonly sessionStorageService: SessionStorageService,
    @Optional() private readonly logger?: LoggerService
  ) {}

  // Note: this will include service name
  public getDetailedWASupportedJurisdictions(): Observable<HMCTSServiceDetails[]> {
    return this.http
      .get<HMCTSServiceDetails[]>(`${WASupportedJurisdictionsService.jurisdictionUrl}/detail`)
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `WASupportedJurisdictionsService.getDetailedWASupportedJurisdictions downstream failure; endpoint=${WASupportedJurisdictionsService.jurisdictionUrl}/detail`,
            error
          )
        )
      );
  }

  public getWASupportedJurisdictions(): Observable<string[]> {
    const cachedJurisdictions = this.sessionStorageService.getItem(WASupportedJurisdictionsService.jurisdictionStorageKey);
    if (cachedJurisdictions) {
      const jurisdictions = safeJsonParse<string[]>(cachedJurisdictions, null);
      if (Array.isArray(jurisdictions)) {
        // Preserve asynchronous HTTP delivery so case-viewer tabs can finish initializing.
        return scheduled([jurisdictions], asyncScheduler);
      }
      this.sessionStorageService.removeItem(WASupportedJurisdictionsService.jurisdictionStorageKey);
    }

    if (!this.supportedJurisdictionsRequest$) {
      this.supportedJurisdictionsRequest$ = this.http
        .get<string[]>(`${WASupportedJurisdictionsService.jurisdictionUrl}/get`)
        .pipe(
          catchError((error) =>
            logAndRethrow(
              this.logger,
              `WASupportedJurisdictionsService.getWASupportedJurisdictions downstream failure; endpoint=${WASupportedJurisdictionsService.jurisdictionUrl}/get`,
              error
            )
          ),
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
