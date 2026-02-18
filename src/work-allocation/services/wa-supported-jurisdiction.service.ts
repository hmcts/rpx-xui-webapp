import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HMCTSServiceDetails } from '../../app/models';
import { LoggerService } from '../../app/services/logger/logger.service';
import { logAndRethrow } from './work-allocation-error.utils';

@Injectable()
export class WASupportedJurisdictionsService {
  public static jurisdictionUrl: string = '/api/wa-supported-jurisdiction';
  public constructor(
    private readonly http: HttpClient,
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
    return this.http
      .get<string[]>(`${WASupportedJurisdictionsService.jurisdictionUrl}/get`)
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `WASupportedJurisdictionsService.getWASupportedJurisdictions downstream failure; endpoint=${WASupportedJurisdictionsService.jurisdictionUrl}/get`,
            error
          )
        )
      );
  }
}
