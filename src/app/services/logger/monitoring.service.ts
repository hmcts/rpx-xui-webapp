import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationInsights, IConfig, IEventTelemetry, IPageViewPerformanceTelemetry } from '@microsoft/applicationinsights-web';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, take } from 'rxjs/operators';

export interface IMonitoringService {
  logPageView(name?: string, url?: string, properties?: any, measurements?: any, duration?: number);
  logEvent(name: string, properties?: any, measurements?: any);
  logException(exception: Error);
}

export class MonitorConfig implements IConfig {
  public instrumentationKey?: string;
  public connectionString?: string;
  public endpointUrl?: string;
  public emitLineDelimitedJson?: boolean;
  public accountId?: string;
  public sessionRenewalMs?: number;
  public sessionExpirationMs?: number;
  public maxBatchSizeInBytes?: number;
  public maxBatchInterval?: number;
  public enableDebug?: boolean;
  public disableExceptionTracking?: boolean;
  public disableTelemetry?: boolean;
  public verboseLogging?: boolean;
  public diagnosticLogInterval?: number;
  public samplingPercentage?: number;
  public autoTrackPageVisitTime?: boolean;
  public disableAjaxTracking?: boolean;
  public overridePageViewDuration?: boolean;
  public maxAjaxCallsPerView?: number;
  public disableDataLossAnalysis?: boolean;
  public disableCorrelationHeaders?: boolean;
  public correlationHeaderExcludedDomains?: string[];
  public disableFlushOnBeforeUnload?: boolean;
  public enableSessionStorageBuffer?: boolean;
  public isCookieUseDisabled?: boolean;
  public cookieDomain?: string;
  public isRetryDisabled?: boolean;
  public url?: string;
  public isStorageUseDisabled?: boolean;
  public isBeaconApiDisabled?: boolean;
  public sdkExtension?: string;
  public isBrowserLinkTrackingEnabled?: boolean;
  public appId?: string;
  public enableCorsCorrelation?: boolean;
}

@Injectable()
export class MonitoringService implements IMonitoringService {
  public areCookiesEnabled: boolean = false;
  public appInsights: ApplicationInsights;
  private initialization$?: Observable<boolean>;

  constructor(private readonly http: HttpClient) {}

  public logPageView(name?: string, url?: string, properties?: any, measurements?: any, duration?: number) {
    const pageViewTelemetry: IPageViewPerformanceTelemetry = {
      name,
      uri: url,
      properties,
      measurements,
      duration: duration?.toString(),
    };
    this.send(() => {
      this.appInsights.trackPageView(pageViewTelemetry);
    });
  }

  public logEvent(name: string, properties?: any, measurements?: any) {
    const eventTelemetry: IEventTelemetry = {
      name,
      properties,
      measurements,
    };
    this.send(() => {
      this.appInsights.trackEvent(eventTelemetry);
    });
  }

  public logException(exception: Error) {
    this.send(() => {
      this.appInsights.trackException({ exception });
    });
  }

  public enableCookies() {
    this.areCookiesEnabled = true;
  }

  private send(func: () => void): void {
    this.initialize().subscribe((initialized) => {
      if (initialized) {
        try {
          func();
        } catch {
          // Telemetry failures must not interrupt the application or log sensitive error details.
        }
      }
    });
  }

  private initialize(): Observable<boolean> {
    if (!this.initialization$) {
      this.initialization$ = defer(() => this.http.get<{ connectionString?: string }>('/api/monitoring-tools')).pipe(
        take(1),
        map((monitor) => {
          const connectionString = monitor?.connectionString;
          if (typeof connectionString !== 'string' || !connectionString.trim()) {
            return false;
          }

          const config: MonitorConfig = { connectionString };
          if (!this.areCookiesEnabled) {
            Object.assign(config, {
              isCookieUseDisabled: true,
              isStorageUseDisabled: true,
              enableSessionStorageBuffer: true,
            });
          }

          const appInsights = this.createAppInsights(config);
          appInsights.loadAppInsights();
          this.appInsights = appInsights;
          return true;
        }),
        // Cache failure as well as success: later log calls must not repeatedly retry initialization.
        catchError(() => of(false)),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }
    return this.initialization$;
  }

  private createAppInsights(config: MonitorConfig): ApplicationInsights {
    return new ApplicationInsights({ config });
  }
}
