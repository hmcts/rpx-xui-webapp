import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ENVIRONMENT_CONFIG, EnvironmentConfig } from '../../../models/environmentConfig.model';
import { DeploymentEnvironmentEnum } from '../../enums/deployment-environment-enum';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private data: EnvironmentConfig;

  public config$: Observable<EnvironmentConfig>;

  constructor(
    @Inject(ENVIRONMENT_CONFIG) config: EnvironmentConfig,
    @Inject(Window) private readonly window: Window
  ) {
    this.data = config;
    this.config$ = of(config).pipe(shareReplay(1));
  }

  public get<K extends keyof EnvironmentConfig>(key: K): EnvironmentConfig[K] {
    if (this.data) {
      return this.data[key];
    }
    return null;
  }

  public getDeploymentEnv(): DeploymentEnvironmentEnum {
    const hostname = this.window.location.hostname;
    console.log('Detecting environment for hostname ' + hostname);
    switch (hostname) {
      case 'manage-case.platform.hmcts.net':
        return DeploymentEnvironmentEnum.PROD;
      case 'manage-case.aat.platform.hmcts.net':
        return DeploymentEnvironmentEnum.AAT;
      case 'manage-case.perftest.platform.hmcts.net':
        return DeploymentEnvironmentEnum.PERFTEST;
      case 'manage-case.ithc.platform.hmcts.net':
        return DeploymentEnvironmentEnum.ITHC;
      case 'localhost':
        return DeploymentEnvironmentEnum.LOCAL;
      default: {
        if (hostname.includes('.demo.platform.hmcts.net')) {
          return DeploymentEnvironmentEnum.DEMO;
        } else if (hostname.includes('.preview.platform.hmcts.net')) {
          return DeploymentEnvironmentEnum.PREVIEW;
        }
        return DeploymentEnvironmentEnum.PROD;
      }
    }
  }
}
