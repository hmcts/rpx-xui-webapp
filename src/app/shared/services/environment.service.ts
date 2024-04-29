import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { EnvironmentConfig } from '../../../models/environmentConfig.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private data: EnvironmentConfig;
  public config$: Observable<EnvironmentConfig>;

  constructor(private readonly http: HttpClient) {
    this.config$ = this.http.get<EnvironmentConfig>('/external/config/ui')
      .pipe(
        catchError((error) => {
          console.error('Error fetching configuration:', error);
          return throwError(() => new Error('Error fetching configuration'));
        }),
        shareReplay(1)
      );
  }

  public get<K extends keyof EnvironmentConfig>(key: K): EnvironmentConfig[K] {
    return this.data[key];
  }

  public isProd(): boolean {
    let isProd = true;
    if (this.data?.ccdGatewayUrl) {
      isProd = this.data.ccdGatewayUrl === 'https://gateway.ccd.platform.hmcts.net';
    }
    return isProd;
  }
}
