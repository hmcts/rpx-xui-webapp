import { Injectable } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from '../../app/app.constants';
import { ServiceConfig, WAFeatureConfig } from '../models/common/service-config.model';

@Injectable({ providedIn: 'root' })
export class WorkAllocationFeatureService {
  constructor(private readonly featureToggleService: FeatureToggleService) {}

  private checkForServiceConfig(serviceConfigs: ServiceConfig[], service: string, caseType: string): string {
    serviceConfigs.forEach((serviceConfig) => {
      if (serviceConfig.serviceName === service && serviceConfig.caseTypes.includes(caseType)) {
        return serviceConfig.releaseVersion;
      }
    });
    return null;
  }

  public getActiveWAFeature(service: string, caseType?: string): Observable<string> {
    return this.featureToggleService.getValue<WAFeatureConfig>(AppConstants.FEATURE_NAMES.waServiceConfig, null).pipe(map(
      (waServiceConfig) => {
        return waServiceConfig && waServiceConfig.configurations
          ? this.checkForServiceConfig(waServiceConfig.configurations, service, caseType) : null;
      }
    )
    );
  }
}
