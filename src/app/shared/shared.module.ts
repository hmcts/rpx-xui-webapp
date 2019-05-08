import { NgModule } from '@angular/core';

import * as fromAppComponents from '../components';
import * as fromAppContainers from '../containers';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

/**
 * Shared Module
 * Used to share common modules and components/containers across the app
 * FormsModule, CommonModule, ReactiveForms etc..
 * */
@NgModule( {
  imports: [RouterModule, CommonModule],
  declarations: [...fromAppComponents.components, ...fromAppContainers.containers],
  exports: [...fromAppComponents.components, ...fromAppContainers.containers],
})
export class SharedModule {}
