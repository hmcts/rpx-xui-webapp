import { Injectable, Optional } from '@angular/core';
import { AppInsights } from 'applicationinsights-js';
import { HttpClient } from '@angular/common/http';
import { AbstractAppInsights} from './appInsightsWrapper';

export interface IMonitoringService {
  logPageView(name?: string, url?: string, properties?: any,
              measurements?: any, duration?: number);
  logEvent(name: string, properties?: any, measurements?: any);
  logException(exception: Error);
}

export class MonitorConfig implements Microsoft.ApplicationInsights.IConfig {
  instrumentationKey?: string;
  endpointUrl?: string;
  emitLineDelimitedJson?: boolean;
  accountId?: string;
  sessionRenewalMs?: number;
  sessionExpirationMs?: number;
  maxBatchSizeInBytes?: number;
  maxBatchInterval?: number;
  enableDebug?: boolean;
  disableExceptionTracking?: boolean;
  disableTelemetry?: boolean;
  verboseLogging?: boolean;
  diagnosticLogInterval?: number;
  samplingPercentage?: number;
  autoTrackPageVisitTime?: boolean;
  disableAjaxTracking?: boolean;
  overridePageViewDuration?: boolean;
  maxAjaxCallsPerView?: number;
  disableDataLossAnalysis?: boolean;
  disableCorrelationHeaders?: boolean;
  correlationHeaderExcludedDomains?: string[];
  disableFlushOnBeforeUnload?: boolean;
  enableSessionStorageBuffer?: boolean;
  isCookieUseDisabled?: boolean;
  cookieDomain?: string;
  isRetryDisabled?: boolean;
  url?: string;
  isStorageUseDisabled?: boolean;
  isBeaconApiDisabled?: boolean;
  sdkExtension?: string;
  isBrowserLinkTrackingEnabled?: boolean;
  appId?: string;
  enableCorsCorrelation?: boolean;
}



@Injectable()
export class MonitoringService implements IMonitoringService {

  constructor(private http: HttpClient, @Optional() private config?: MonitorConfig,
              @Optional() private appInsights?: AbstractAppInsights) {
                if (!appInsights) {
                appInsights = AppInsights;
              }
            }

  logPageView(name?: string, url?: string, properties?: any,
              measurements?: any, duration?: number) {
    this.send(() => {
      this.appInsights.trackPageView(name, url, properties, measurements, duration);
    });
  }

  logEvent(name: string, properties?: any, measurements?: any) {
    this.send(() => {
      this.appInsights.trackEvent(name, properties, measurements);
    });
  }

  logException(exception: Error) {
    this.send(() => {
      this.appInsights.trackException(exception);
    });
  }

  disableCookies() {
    this.http.get('/api/monitoring-tools').subscribe(it => {
      this.config = {
        // tslint:disable-next-line: no-string-literal
        instrumentationKey: it['key'],
        isCookieUseDisabled: true,
        isStorageUseDisabled: true,
        enableSessionStorageBuffer: true
      };
      this.appInsights.clearAuthenticatedUserContext();
      this.appInsights.downloadAndSetup(this.config);
    });
  }

  private send(func: () => any): void {
    if (this.config && this.config.instrumentationKey) {
      func();
    } else {
      this.http.get('/api/monitoring-tools').subscribe(it => {
        this.config = {
          // tslint:disable-next-line: no-string-literal
          instrumentationKey: it['key']
        };
        if (!this.appInsights.config) {
          this.appInsights.downloadAndSetup(this.config);
        }
        func();
      });
    }
  }
}
