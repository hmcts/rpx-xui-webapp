import { Injectable, Optional } from '@angular/core';
import { ApplicationInsights, IConfig, IConfiguration } from '@microsoft/applicationinsights-web'
import { EnvironmentService } from '../../shared/services/environment.service';

export interface IMonitoringService {
  logPageView(name?: string, uri?: string, properties?: any,
              measurements?: any, refUri?: string,
              pageType?: string, isLoggedIn?: boolean);
  logEvent(name: string, properties?: any, measurements?: any);
  logException(exception: Error);
}

@Injectable()
export class MonitoringService implements IMonitoringService {

  public static getConfig(appInsightsKey: string): IConfiguration & IConfig {
    return {
      disableTelemetry: true,
      instrumentationKey: appInsightsKey
    };
  }

  public static getAppInsightsInstance(config: IConfiguration & IConfig) {
    return new ApplicationInsights({
      config
    });
  }

  constructor(private readonly environmentService: EnvironmentService,
              @Optional() public appInsights?: ApplicationInsights) {
                this.appInsights = appInsights;
            }

  public logPageView(name?: string,
                     uri?: string,
                     properties?: any,
                     measurements?: any,
                     refUri?: string,
                     pageType?: string,
                     isLoggedIn?: boolean) {
      this.send(this.appInsights, () => {
        this.appInsights.trackPageView({name, uri, properties, measurements, refUri, pageType, isLoggedIn});
      });
  }

  public logEvent(name: string, properties?: any, measurements?: any) {
    this.send(this.appInsights, () => {
      this.appInsights.trackEvent({name}, properties);
    });
  }

  public logException(exception: Error) {
    this.send(this.appInsights, () => {
      this.appInsights.trackException({exception});
    });
  }

  public send(appInsights: ApplicationInsights, func: () => any): void {
    const isAppInsightsEnabled = this.environmentService.get('isAppInsightsEnabled');
    if (isAppInsightsEnabled) {
      if (!appInsights) {
        this.appInsights = this.initialiseAppInsights();
      }
      func()
    }
  }

  public initialiseAppInsights(): ApplicationInsights {
    const appInsightsKey = this.environmentService.get('appInsightsKey');
    const config = MonitoringService.getConfig(appInsightsKey);
    const applicationInsights = MonitoringService.getAppInsightsInstance(config);
    applicationInsights.loadAppInsights();
    return applicationInsights;
  }
}
