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
    const cachedJurisdictions = this.getCachedJurisdictions();
    if (cachedJurisdictions) {
      // Preserve asynchronous HTTP delivery so case-viewer tabs can finish initializing.
      return scheduled([cachedJurisdictions], asyncScheduler);
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
            try {
              this.sessionStorageService.setItem(
                WASupportedJurisdictionsService.jurisdictionStorageKey,
                JSON.stringify(jurisdictions)
              );
            } catch {
              // Cache failures must not prevent delivery of a successful API response.
            }
          }),
          finalize(() => (this.supportedJurisdictionsRequest$ = null)),
          shareReplay({ bufferSize: 1, refCount: false })
        );
    }

    return this.supportedJurisdictionsRequest$;
  }

  private getCachedJurisdictions(): string[] | null {
    try {
      const cachedJurisdictions = this.sessionStorageService.getItem(WASupportedJurisdictionsService.jurisdictionStorageKey);
      if (cachedJurisdictions) {
        const jurisdictions = safeJsonParse<string[]>(cachedJurisdictions, null);
        if (Array.isArray(jurisdictions)) {
          return jurisdictions;
        }
        this.sessionStorageService.removeItem(WASupportedJurisdictionsService.jurisdictionStorageKey);
      }
    } catch {
      // Fall back to the API when the cache cannot be read or cleared.
    }
    return null;
  }
}
