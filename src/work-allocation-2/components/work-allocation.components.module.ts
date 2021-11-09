import { PipesModule } from '@hmcts/ccd-case-ui-toolkit';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';

import * as fromComponents from '.';
import { CaseworkerDataService, InfoMessageCommService, LocationDataService, WASupportedJurisdictionsService } from '../services';
import { WorkAllocationPipesModule } from '../pipes/work-allocation.pipes.module';
import { PriorityFieldComponentModule } from './priority-field/priority.module';

// from containers
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ExuiCommonLibModule,
    FormsModule, // TODO: Remove this as it's only needed for testing.
    PipesModule,
    WorkAllocationPipesModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    PriorityFieldComponentModule
  ],
  declarations: [
    ...fromComponents.components,
  ],
  providers: [CaseworkerDataService, LocationDataService, InfoMessageCommService, WASupportedJurisdictionsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ...fromComponents.components,
  ]
})
export class WorkAllocationComponentsModule {

}
