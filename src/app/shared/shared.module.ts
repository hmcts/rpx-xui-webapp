import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as fromAppComponents from '../components';
import * as fromAppContainers from '../containers';
import * as fromAppDirectives from '../directives';
import { HealthCheckGuard } from './guards/health-check.guard';
import { HealthCheckService } from './services/health-check.service';
import { MediaViewerModule } from '@hmcts/media-viewer';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule, GOV_UI_COMPONENTS, LAUNCHDARKLYKEY } from '@hmcts/rpx-xui-common-lib';
import { EnvironmentConfig, ENVIRONMENT_CONFIG } from '../../models/environmentConfig.model';

/**
 * Shared Module
 * Used to share common modules and components/containers across the app
 * FormsModule, CommonModule, ReactiveForms etc..
 */
 export function launchDarklyClientIdFactory(envConfig: EnvironmentConfig): string {
  return envConfig.launchDarklyClientId || '';
}

@NgModule( {
  imports: [RouterModule, CommonModule, MediaViewerModule, ExuiCommonLibModule.forRoot()],
  declarations: [
    ...fromAppComponents.components,
    ...fromAppContainers.containers,
    ...fromAppDirectives.directives
  ],
  exports: [
    ...fromAppComponents.components,
    ...fromAppContainers.containers,
    ...fromAppDirectives.directives,
    ...GOV_UI_COMPONENTS
  ],
  providers: [
    HealthCheckGuard,
    HealthCheckService,
    WindowService,
    { provide: LAUNCHDARKLYKEY, useFactory: launchDarklyClientIdFactory, deps: [ENVIRONMENT_CONFIG] },
  ],
})
export class SharedModule {}
