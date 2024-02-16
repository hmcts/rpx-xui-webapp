import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { ApplicationInsights, IAppInsights, IConfig } from '@microsoft/applicationinsights-web';

export interface IMonitoringService {
  logPageView(name?: string, url?: string, properties?: any,
              measurements?: any, duration?: number);
  logEvent(name: string, properties?: any, measurements?: any);
  logException(exception: Error);
}

export class MonitorConfig implements IConfig {
  public instrumentationKey?: string;
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
  @Optional() appInsights: IAppInsights;

  constructor(private readonly http: HttpClient, @Optional() private config?: MonitorConfig) {
    if (!this.appInsights) {
      this.appInsights = new ApplicationInsights({ config });
    }
  }

  public logPageView(name?: string, url?: string, properties?: any,
    measurements?: any, duration?: number) {
    this.send(() => {
      this.appInsights.trackPageView({ name, uri: url }, { properties, measurements, duration });
    });
  }

  public logEvent(name: string, properties?: any, measurements?: any) {
    this.send(() => {
      this.appInsights.trackEvent({ name }, { properties, measurements });
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

  private send(func: () => any): void {
    if (this.config?.instrumentationKey) {
      func();
    } else {
      this.http.get('/api/monitoring-tools').subscribe((it) => {
        this.config = {
          // eslint-disable-next-line dot-notation
          instrumentationKey: it['key']
        };
        if (!this.areCookiesEnabled) {
          this.config = {
            ...this.config,
            isCookieUseDisabled: true,
            isStorageUseDisabled: true,
            enableSessionStorageBuffer: true
          };
        }
        func();
      });
    }
  }
}
