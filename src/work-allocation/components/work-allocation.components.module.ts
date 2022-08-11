import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';

import * as fromComponents from '.';
import * as fromPipes from '../pipes';
import { CaseworkerDataService, InfoMessageCommService, LocationDataService } from '../services';

// from containers
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ExuiCommonLibModule,
    FormsModule, // TODO: Remove this as it's only needed for testing.
    PipesModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...fromComponents.components,
    ...fromPipes.pipes
  ],
  providers: [CaseworkerDataService, LocationDataService, InfoMessageCommService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ...fromComponents.components,
    ...fromPipes.pipes
  ]
})
export class WorkAllocationComponentsModule {

}
