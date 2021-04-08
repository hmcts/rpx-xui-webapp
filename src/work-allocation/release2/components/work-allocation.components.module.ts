import { PipesModule } from '@hmcts/ccd-case-ui-toolkit';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';

import * as fromComponents from '.';
import * as fromPipes from 'src/work-allocation/pipes';
import { CaseworkerDataService, InfoMessageCommService, LocationDataService } from 'src/work-allocation/services';
import { WorkAllocationPipesModule } from 'src/work-allocation/pipes/work-allocation.pipes.module';
import { WorkAllocationComponentsModule } from 'src/work-allocation/components/work-allocation.components.module';

// from containers
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ExuiCommonLibModule,
    FormsModule, // TODO: Remove this as it's only needed for testing.
    PipesModule,
    WorkAllocationPipesModule,
    WorkAllocationComponentsModule
  ],
  declarations: [
    ...fromComponents.components
  ],
  providers: [CaseworkerDataService, LocationDataService, InfoMessageCommService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ...fromComponents.components
  ]
})
export class WorkAllocationRelease2ComponentsModule {

}
