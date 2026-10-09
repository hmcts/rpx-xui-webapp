import { HttpClient } from '@angular/common/http';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { of, Subject, throwError } from 'rxjs';
import { MonitoringService } from './monitoring.service';

describe('Monitoring service', () => {
  const connectionString = 'InstrumentationKey=dummy';
  let http: jasmine.SpyObj<HttpClient>;
  let appInsights: jasmine.SpyObj<ApplicationInsights>;
  let service: MonitoringService;
  let createAppInsights: jasmine.Spy;

  beforeEach(() => {
    http = jasmine.createSpyObj('HttpClient', ['get']);
    http.get.and.returnValue(of({ connectionString }));
    appInsights = jasmine.createSpyObj('ApplicationInsights', [
      'loadAppInsights',
      'trackEvent',
      'trackPageView',
      'trackException',
    ]);
    service = new MonitoringService(http);
    createAppInsights = spyOn<any>(service, 'createAppInsights').and.returnValue(appInsights);
  });

  it('should initialize lazily', () => {
    expect(service).toBeTruthy();
    expect(http.get).not.toHaveBeenCalled();
    expect(createAppInsights).not.toHaveBeenCalled();
  });

  it('should share one initialization across concurrent telemetry calls and reuse it afterwards', () => {
    const response = new Subject<{ connectionString: string }>();
    http.get.and.returnValue(response);
    const exception = new Error('Test failure');
    service.logEvent('Hearings.JourneyStarted');
    service.logPageView('Hearings', '/hearings', undefined, undefined, 100);
    service.logException(exception);
    expect(http.get).toHaveBeenCalledOnceWith('/api/monitoring-tools');
    expect(createAppInsights).not.toHaveBeenCalled();
    expect(appInsights.trackEvent).not.toHaveBeenCalled();
    expect(appInsights.trackPageView).not.toHaveBeenCalled();
    expect(appInsights.trackException).not.toHaveBeenCalled();
    response.next({ connectionString });
    response.complete();
    service.logEvent('Hearings.Action');
    expect(createAppInsights).toHaveBeenCalledTimes(1);
    expect(appInsights.loadAppInsights).toHaveBeenCalledTimes(1);
    expect(appInsights.trackEvent).toHaveBeenCalledTimes(2);
    expect(appInsights.trackPageView).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({
        name: 'Hearings',
        uri: '/hearings',
        properties: undefined,
        measurements: undefined,
        duration: '100',
      })
    );
    expect(appInsights.trackException).toHaveBeenCalledOnceWith({ exception });
    expect(http.get).toHaveBeenCalledTimes(1);
  });

  it('should preserve event properties and measurements', () => {
    const properties = { action: 'continue' };
    const measurements = { elapsedMs: 100 };
    service.logEvent('Hearings.Action', properties, measurements);
    expect(appInsights.trackEvent).toHaveBeenCalledOnceWith({ name: 'Hearings.Action', properties, measurements });
  });

  it('should allow page views without a duration', () => {
    expect(() => service.logPageView('Hearings')).not.toThrow();
    expect(appInsights.trackPageView).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({
        name: 'Hearings',
        uri: undefined,
        properties: undefined,
        measurements: undefined,
        duration: undefined,
      })
    );
  });

  it('should disable cookies and storage by default', () => {
    service.logEvent('Hearings.Action');
    expect(createAppInsights).toHaveBeenCalledOnceWith({
      connectionString,
      isCookieUseDisabled: true,
      isStorageUseDisabled: true,
      enableSessionStorageBuffer: true,
    });
  });

  it('should respect cookies enabled before initialization completes', () => {
    const response = new Subject<{ connectionString: string }>();
    http.get.and.returnValue(response);
    service.logEvent('Hearings.Action');
    service.enableCookies();
    response.next({ connectionString });
    expect(service.areCookiesEnabled).toBeTrue();
    expect(createAppInsights).toHaveBeenCalledOnceWith({ connectionString });
  });

  it('should safely drop queued and later telemetry when the configuration request fails', () => {
    const response = new Subject<{ connectionString: string }>();
    http.get.and.returnValue(response);
    service.logEvent('Hearings.Action');
    service.logPageView('Hearings');
    expect(() => response.error(new Error('Configuration unavailable'))).not.toThrow();
    expect(() => service.logException(new Error('Test failure'))).not.toThrow();
    expect(http.get).toHaveBeenCalledTimes(1);
    expect(createAppInsights).not.toHaveBeenCalled();
    expect(appInsights.trackEvent).not.toHaveBeenCalled();
    expect(appInsights.trackPageView).not.toHaveBeenCalled();
    expect(appInsights.trackException).not.toHaveBeenCalled();
  });

  it('should handle immediate configuration errors without retrying', () => {
    http.get.and.returnValue(throwError(() => new Error('Configuration unavailable')));
    expect(() => service.logEvent('Hearings.Action')).not.toThrow();
    service.logEvent('Hearings.Action');
    expect(http.get).toHaveBeenCalledTimes(1);
    expect(createAppInsights).not.toHaveBeenCalled();
  });

  [null, {}, { connectionString: '' }, { connectionString: '   ' }, { connectionString: 123 }].forEach((response) => {
    it(`should skip initialization for invalid configuration: ${JSON.stringify(response)}`, () => {
      http.get.and.returnValue(of(response));
      expect(() => service.logEvent('Hearings.Action')).not.toThrow();
      service.logEvent('Hearings.Action');
      expect(http.get).toHaveBeenCalledTimes(1);
      expect(createAppInsights).not.toHaveBeenCalled();
      expect(appInsights.trackEvent).not.toHaveBeenCalled();
    });
  });

  it('should handle SDK construction failure without retrying or tracking', () => {
    createAppInsights.and.throwError('SDK construction failed');
    expect(() => service.logEvent('Hearings.Action')).not.toThrow();
    service.logEvent('Hearings.Action');
    expect(createAppInsights).toHaveBeenCalledTimes(1);
    expect(appInsights.loadAppInsights).not.toHaveBeenCalled();
    expect(appInsights.trackEvent).not.toHaveBeenCalled();
    expect(service.appInsights).toBeUndefined();
  });

  it('should not publish a partially initialized SDK when loading fails', () => {
    appInsights.loadAppInsights.and.throwError('SDK loading failed');
    expect(() => service.logEvent('Hearings.Action')).not.toThrow();
    service.logException(new Error('Test failure'));
    expect(appInsights.loadAppInsights).toHaveBeenCalledTimes(1);
    expect(appInsights.trackEvent).not.toHaveBeenCalled();
    expect(appInsights.trackException).not.toHaveBeenCalled();
    expect(service.appInsights).toBeUndefined();
  });

  it('should isolate tracking failures and allow subsequent telemetry', () => {
    appInsights.trackEvent.and.throwError('Tracking failed');
    expect(() => service.logEvent('Hearings.Action')).not.toThrow();
    service.logPageView('Hearings');
    expect(appInsights.trackPageView).toHaveBeenCalledTimes(1);
    expect(appInsights.loadAppInsights).toHaveBeenCalledTimes(1);
    expect(http.get).toHaveBeenCalledTimes(1);
  });
});
