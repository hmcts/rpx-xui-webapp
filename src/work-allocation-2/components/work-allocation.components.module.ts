import { PipesModule } from '@hmcts/ccd-case-ui-toolkit';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';

import * as fromComponents from '.';
import * as fromPipes from '../pipes';
import { CaseworkerDataService, InfoMessageCommService, LocationDataService } from '../services';
import { WorkAllocationPipesModule } from '../pipes/work-allocation.pipes.module';

// from containers
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ExuiCommonLibModule,
    FormsModule, // TODO: Remove this as it's only needed for testing.
    PipesModule,
    WorkAllocationPipesModule
  ],
  declarations: [
    ...fromComponents.components,
  ],
  providers: [CaseworkerDataService, LocationDataService, InfoMessageCommService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ...fromComponents.components,
  ]
})
export class WorkAllocationComponentsModule {

}
