import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit';
import { MediaViewerModule } from '@hmcts/media-viewer';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { RpxTranslationModule } from 'rpx-xui-translation';
import * as fromAppComponents from '../components';
import * as fromAppContainers from '../containers';
import * as fromAppDirectives from '../directives';
import { TaskSupervisorGuard } from '../guards/task-supervisor.guard';
import { HealthCheckGuard } from './guards/health-check.guard';
import { HealthCheckService } from './services/health-check.service';
import { McLaunchDarklyService } from './services/mc-launch-darkly-service';

/**
 * Shared Module
 * Used to share common modules and components/containers across the app
 * FormsModule, CommonModule, ReactiveForms etc..
 */

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MediaViewerModule,
    ExuiCommonLibModule,
    ReactiveFormsModule,
    RpxTranslationModule.forChild()
  ],
  declarations: [
    ...fromAppComponents.components,
    ...fromAppContainers.containers,
    ...fromAppDirectives.directives
  ],
  exports: [
    ...fromAppComponents.components,
    ...fromAppContainers.containers,
    ...fromAppDirectives.directives,
    RpxTranslationModule
  ],
  providers: [
    HealthCheckGuard,
    HealthCheckService,
    WindowService,
    McLaunchDarklyService,
    TaskSupervisorGuard
  ]
})
export class SharedModule {}
