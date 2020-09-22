import { NgModule } from '@angular/core';

import * as fromAppComponents from '../components';
import * as fromAppContainers from '../containers';
import * as fromAppDirectives from '../directives';

import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import { HealthCheckGuard } from './guards/health-check.guard';
import { HealthCheckService } from './services/health-check.service';
import { ExUITitleService } from './services/exui-title.service';
import { MediaViewerModule } from '@hmcts/media-viewer';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';

/**
 * Shared Module
 * Used to share common modules and components/containers across the app
 * FormsModule, CommonModule, ReactiveForms etc..
 */
@NgModule( {
  imports: [RouterModule, CommonModule, MediaViewerModule, ExuiCommonLibModule.forChild()],
  declarations: [
    ...fromAppComponents.components,
    ...fromAppContainers.containers,
    ...fromAppDirectives.directives
  ],
  exports: [
    ...fromAppComponents.components,
    ...fromAppContainers.containers,
    ...fromAppDirectives.directives
  ],
  providers: [
    HealthCheckGuard,
    HealthCheckService,
    ExUITitleService,
    WindowService,
    AlertService
  ],
})
export class SharedModule {}
