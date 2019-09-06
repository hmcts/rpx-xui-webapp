import { AppInsights } from 'applicationinsights-js';

export abstract class AbstractAppInsights implements Microsoft.ApplicationInsights.IAppInsights {
  config: Microsoft.ApplicationInsights.IConfig;  context: Microsoft.ApplicationInsights.ITelemetryContext;
  queue: (() => void)[];
  abstract startTrackPage(name?: string);
  abstract stopTrackPage(name?: string, url?: string, properties?: { [name: string]: string; },
                         measurements?: { [name: string]: number; });
  abstract trackPageView(name?: string, url?: string, properties?: { [name: string]: string; },
                         measurements?: { [name: string]: number; }, duration?: number);
  abstract startTrackEvent(name: string);
  abstract stopTrackEvent(name: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; });
  abstract trackEvent(name: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; });
  abstract trackDependency(id: string, method: string, absoluteUrl: string, pathName: string, totalTime: number,
                           success: boolean, resultCode: number,
                           properties?: { [name: string]: string; }, measurements?: { [name: string]: number; });

  abstract trackException(exception: Error, handledAt?: string,
                          properties?: { [name: string]: string; }, measurements?: { [name: string]: number; },
                          severityLevel?: AI.SeverityLevel);

  abstract trackMetric(name: string, average: number, sampleCount?: number, min?: number, max?: number,
                       properties?: { [name: string]: string; });
  abstract trackTrace(message: string, properties?: { [name: string]: string; }, severityLevel?: AI.SeverityLevel) ;
  abstract flush();
  abstract setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string, storeInCookie?: boolean);
  abstract clearAuthenticatedUserContext();
  abstract downloadAndSetup?(config: Microsoft.ApplicationInsights.IConfig);
  abstract _onerror(message: string, url: string, lineNumber: number, columnNumber: number, error: Error);

}

export class AppInsightsWrapper implements AbstractAppInsights {
  config: Microsoft.ApplicationInsights.IConfig;  context: Microsoft.ApplicationInsights.ITelemetryContext;
  queue: (() => void)[];
  startTrackPage(name?: string) {
    AppInsights.startTrackPage(name);
  }
  stopTrackPage(name?: string, url?: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; }) {
    AppInsights.stopTrackPage(name, url, properties, measurements);
  }
  trackPageView(name?: string, url?: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; },
                duration?: number) {
    AppInsights.trackPageView(name, url, properties, measurements, duration);
  }
  startTrackEvent(name: string) {
    AppInsights.startTrackEvent(name);
  }
  stopTrackEvent(name: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; }) {
    AppInsights.stopTrackEvent(name, properties, measurements);
  }
  trackEvent(name: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; }) {
    AppInsights.trackEvent(name, properties, measurements);
  }
  trackDependency(id: string, method: string, absoluteUrl: string, pathName: string, totalTime: number, success: boolean,
                  resultCode: number, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; }) {
    AppInsights.trackDependency(id, method, absoluteUrl, pathName, totalTime, success, resultCode, properties, measurements);
  }
  trackException(exception: Error, handledAt?: string, properties?: { [name: string]: string; },
                 measurements?: { [name: string]: number; }, severityLevel?: AI.SeverityLevel) {
    AppInsights.trackException(exception, handledAt, properties, measurements, severityLevel);
  }
  trackMetric(name: string, average: number, sampleCount?: number, min?: number, max?: number, properties?: { [name: string]: string; }) {
    AppInsights.trackMetric(name, average, sampleCount, min, max, properties);
  }
  trackTrace(message: string, properties?: { [name: string]: string; }, severityLevel?: AI.SeverityLevel) {
    AppInsights.trackTrace(message, properties, severityLevel);
  }
  flush() {
    AppInsights.flush();
  }
  setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string, storeInCookie?: boolean) {
    AppInsights.setAuthenticatedUserContext(authenticatedUserId, accountId, storeInCookie);
  }
  clearAuthenticatedUserContext() {
    AppInsights.clearAuthenticatedUserContext();
  }
  downloadAndSetup?(config: Microsoft.ApplicationInsights.IConfig) {
    AppInsights.downloadAndSetup(config);
  }
  _onerror(message: string, url: string, lineNumber: number, columnNumber: number, error: Error) {
    AppInsights._onerror(message, url, lineNumber, columnNumber, error);
  }
}
