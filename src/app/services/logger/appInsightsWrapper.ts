import { AppInsights } from 'applicationinsights-js';

export abstract class AbstractAppInsights implements Microsoft.ApplicationInsights.IAppInsights {
  public config: Microsoft.ApplicationInsights.IConfig;  public context: Microsoft.ApplicationInsights.ITelemetryContext;
  public queue: (() => void)[];
  public abstract startTrackPage(name?: string);
  public abstract stopTrackPage(name?: string, url?: string, properties?: { [name: string]: string; },
                                measurements?: { [name: string]: number; });
  public abstract trackPageView(name?: string, url?: string, properties?: { [name: string]: string; },
                                measurements?: { [name: string]: number; }, duration?: number);
  public abstract startTrackEvent(name: string);
  public abstract stopTrackEvent(name: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; });
  public abstract trackEvent(name: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; });
  public abstract trackDependency(id: string, method: string, absoluteUrl: string, pathName: string, totalTime: number,
                                  success: boolean, resultCode: number,
                                  properties?: { [name: string]: string; }, measurements?: { [name: string]: number; });

  public abstract trackException(exception: Error, handledAt?: string,
                                 properties?: { [name: string]: string; }, measurements?: { [name: string]: number; },
                                 severityLevel?: AI.SeverityLevel);

  public abstract trackMetric(name: string, average: number, sampleCount?: number, min?: number, max?: number,
                              properties?: { [name: string]: string; });
  public abstract trackTrace(message: string, properties?: { [name: string]: string; }, severityLevel?: AI.SeverityLevel) ;
  public abstract flush();
  public abstract setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string, storeInCookie?: boolean);
  public abstract clearAuthenticatedUserContext();
  public abstract downloadAndSetup?(config: Microsoft.ApplicationInsights.IConfig);
  public abstract _onerror(message: string, url: string, lineNumber: number, columnNumber: number, error: Error);

}

export class AppInsightsWrapper implements AbstractAppInsights {
  public config: Microsoft.ApplicationInsights.IConfig;  public context: Microsoft.ApplicationInsights.ITelemetryContext;
  public queue: (() => void)[];
  public startTrackPage(name?: string) {
    AppInsights.startTrackPage(name);
  }
  public stopTrackPage(name?: string, url?: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; }) {
    AppInsights.stopTrackPage(name, url, properties, measurements);
  }
  public trackPageView(name?: string, url?: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; },
                       duration?: number) {
    AppInsights.trackPageView(name, url, properties, measurements, duration);
  }
  public startTrackEvent(name: string) {
    AppInsights.startTrackEvent(name);
  }
  public stopTrackEvent(name: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; }) {
    AppInsights.stopTrackEvent(name, properties, measurements);
  }
  public trackEvent(name: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; }) {
    AppInsights.trackEvent(name, properties, measurements);
  }
  public trackDependency(id: string, method: string, absoluteUrl: string, pathName: string, totalTime: number, success: boolean,
                         resultCode: number, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; }) {
    AppInsights.trackDependency(id, method, absoluteUrl, pathName, totalTime, success, resultCode, properties, measurements);
  }
  public trackException(exception: Error, handledAt?: string, properties?: { [name: string]: string; },
                        measurements?: { [name: string]: number; }, severityLevel?: AI.SeverityLevel) {
    AppInsights.trackException(exception, handledAt, properties, measurements, severityLevel);
  }
  public trackMetric(name: string, average: number, sampleCount?: number, min?: number, max?: number, properties?: { [name: string]: string; }) {
    AppInsights.trackMetric(name, average, sampleCount, min, max, properties);
  }
  public trackTrace(message: string, properties?: { [name: string]: string; }, severityLevel?: AI.SeverityLevel) {
    AppInsights.trackTrace(message, properties, severityLevel);
  }
  public flush() {
    AppInsights.flush();
  }
  public setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string, storeInCookie?: boolean) {
    AppInsights.setAuthenticatedUserContext(authenticatedUserId, accountId, storeInCookie);
  }
  public clearAuthenticatedUserContext() {
    AppInsights.clearAuthenticatedUserContext();
  }
  public downloadAndSetup?(config: Microsoft.ApplicationInsights.IConfig) {
    AppInsights.downloadAndSetup(config);
  }
  public _onerror(message: string, url: string, lineNumber: number, columnNumber: number, error: Error) {
    AppInsights._onerror(message, url, lineNumber, columnNumber, error);
  }
}
