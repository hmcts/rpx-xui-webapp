import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatDialogModule } from '@angular/material';

import { SharedModule } from '../app/shared/shared.module';
import { WorkAllocationComponentsModule } from './components/work-allocation.components.module';
import * as fromContainers from './containers';
import { WorkAllocationTaskService } from './services/work-allocation-task.service';
import { workAllocationRouting } from './work-allocation-feature.routes';

// from containers
@NgModule({
  imports: [
      CommonModule,
      HttpClientModule,
      SharedModule,
      HttpModule,
      MatDialogModule,
      WorkAllocationComponentsModule,
      workAllocationRouting
  ],
  declarations: [
    ...fromContainers.containers
  ],
  providers: [WorkAllocationTaskService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class WorkAllocationModule {

}
