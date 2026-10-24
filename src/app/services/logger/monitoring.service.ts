import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import type { IConfig, IEventTelemetry, IPageViewTelemetry } from '@microsoft/applicationinsights-web';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, take } from 'rxjs/operators';
import { sanitizeHearingsException } from '../../../hearings/services/hearings-exception-telemetry';

export interface IMonitoringService {
  logPageView(name?: string, url?: string, properties?: any, measurements?: any, duration?: number);
  logEvent(name: string, properties?: any, measurements?: any);
  logMetric(name: string, value: number, properties: Record<string, string>): void;
  logException(exception: Error, properties?: Record<string, string | number>);
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
    const pageViewTelemetry: IPageViewTelemetry = {
      name,
      uri: url,
      refUri: '',
      properties: duration === undefined ? properties : { ...properties, duration },
      measurements,
      startTime: duration === undefined ? undefined : new Date(Date.now() - duration),
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

  public logMetric(name: string, value: number, properties: Record<string, string>): void {
    this.send(() => this.appInsights.trackMetric({ name, average: value, sampleCount: 1 }, properties));
  }

  public logException(exception: Error, properties?: Record<string, string | number>) {
    this.send(() => {
      this.appInsights.trackException(properties ? { exception, properties } : { exception });
    });
  }

  public enableCookies() {
    this.areCookiesEnabled = true;
  }

  public captureOperationContext(): Record<string, string> {
    try {
      const trace = this.appInsights?.core?.getTraceCtx();
      const operationId = trace?.getTraceId();
      const operationParentId = trace?.getSpanId();
      return {
        ...(operationId && /^[a-f\d]{32}$/i.test(operationId) ? { operationId } : {}),
        ...(operationParentId && /^[a-f\d]{16}$/i.test(operationParentId) ? { operationParentId } : {}),
      };
    } catch {
      return {};
    }
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
      this.initialization$ = defer(() =>
        this.http.get<{ connectionString?: string; samplingPercentage?: number }>('/api/monitoring-tools')
      ).pipe(
        take(1),
        map((monitor) => {
          const connectionString = monitor?.connectionString;
          if (typeof connectionString !== 'string' || !connectionString.trim()) {
            return false;
          }

          const config: MonitorConfig = { connectionString };
          if (monitor.samplingPercentage !== undefined) {
            config.samplingPercentage = monitor.samplingPercentage;
          }
          if (!this.areCookiesEnabled) {
            Object.assign(config, {
              isCookieUseDisabled: true,
              isStorageUseDisabled: true,
              enableSessionStorageBuffer: true,
            });
          }

          const appInsights = this.createAppInsights(config);
          appInsights.loadAppInsights();
          appInsights.addTelemetryInitializer((item) => {
            if (!sanitizeHearingsException(item)) {
              return false;
            }
            if (
              (item.baseType === 'PageviewData' || item.baseType === 'PageviewPerformanceData') &&
              item.baseData?.name?.startsWith('Hearings: ')
            ) {
              // The SDK can add an operation name from the real browser URL. Use the safe template instead.
              if (item.ext?.trace) {
                item.ext.trace.name = item.baseData.uri;
              }
              item.baseData.refUri = '';
            } else if (
              (item.baseType === 'EventData' || item.baseType === 'MetricData') &&
              (item.baseData?.name?.startsWith('Hearings.') || item.baseData?.metrics?.[0]?.name?.startsWith('Hearings.'))
            ) {
              if (item.ext?.trace) {
                item.ext.trace.name = item.baseData.properties?.page || 'Hearings';
              }
            }
          });
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
