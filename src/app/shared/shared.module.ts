import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as fromAppComponents from '../components';
import * as fromAppContainers from '../containers';
import * as fromAppDirectives from '../directives';
import { HealthCheckGuard } from './guards/health-check.guard';
import { ExUITitleService } from './services/exui-title.service';
import { HealthCheckService } from './services/health-check.service';

export const windowToken = new InjectionToken<Window>('Window');

function windowProvider() {
  if (window) {
    return window;
  }
  return null;
}

/**
 * Shared Module
 * Used to share common modules and components/containers across the app
 * FormsModule, CommonModule, ReactiveForms etc..
 */
@NgModule({
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
    HealthCheckService,
    ExUITitleService,
    {
      provide: windowToken,
      useFactory: windowProvider
    }
  ],
})
export class SharedModule { }
