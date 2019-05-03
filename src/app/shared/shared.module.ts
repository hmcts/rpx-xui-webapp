import { NgModule } from '@angular/core';

import * as fromAppComponents from '../components';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

/**
 * Shared Module
 * Used to share common modules and components across the app
 * FormsModule, CommonModule, ReactiveForms etc..
 * */
@NgModule( {
  imports: [RouterModule, CommonModule],
  declarations: [...fromAppComponents.components],
  exports: [...fromAppComponents.components],
})
export class SharedModule {}
