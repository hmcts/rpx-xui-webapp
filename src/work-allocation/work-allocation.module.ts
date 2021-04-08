import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { AlertService, CaseUIToolkitModule, PipesModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';

import { SharedModule } from '../app/shared/shared.module';
import { WorkAllocationComponentsModule } from './components/work-allocation.components.module';
import { WorkAllocationRelease2ComponentsModule } from './release2/components/work-allocation.components.module';
import * as fromContainers from './containers';
import * as fromRelease2Containers from './release2/containers';
import { WorkAllocationFeatureToggleGuard } from './guards';
import { CaseworkerDataService, WorkAllocationTaskService } from './services';
import { WorkAllocationFeatureService } from './services/work-allocation-feature.service';
import { workAllocationRouting } from './work-allocation-feature.routes';

// from containers
@NgModule({
  imports: [
    CaseUIToolkitModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    MatDialogModule,
    WorkAllocationComponentsModule,
    WorkAllocationRelease2ComponentsModule,
    PipesModule,
    workAllocationRouting,
    CdkTableModule,
    ExuiCommonLibModule,
  ],
  declarations: [...fromContainers.containers, ...fromRelease2Containers.containers],
  providers: [
    WorkAllocationTaskService,
    WorkAllocationFeatureToggleGuard,
    AlertService,
    CaseworkerDataService,
    WorkAllocationFeatureService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkAllocationModule {}
