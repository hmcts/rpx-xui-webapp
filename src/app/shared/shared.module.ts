import { NgModule } from '@angular/core';

import * as fromAppComponents from '../components';
import * as fromAppContainers from '../containers';
import * as fromAppDirectives from '../directives';

import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import { HealthCheckGuard } from './guards/health-check.guard';
import { HealthCheckService } from './services/health-check.service';

/**
 * Shared Module
 * Used to share common modules and components/containers across the app
 * FormsModule, CommonModule, ReactiveForms etc..
 */
@NgModule( {
  imports: [RouterModule, CommonModule],
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
    HealthCheckService
  ],
})
export class SharedModule {}
