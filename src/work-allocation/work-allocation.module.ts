import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertService, LoadingService, PaginationModule, PipesModule, SessionStorageService } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from '../app/shared/shared.module';
import { BookingService } from '../booking/services';
import { RoleAccessModule } from '../role-access/role-access.module';
import { PriorityFieldComponentModule } from './components/priority-field/priority.module';
import { WorkAllocationComponentsModule } from './components/work-allocation.components.module';
import * as fromContainers from './containers';
import { WorkAllocationAccessGuard } from './guards';
import { CaseworkerDataService, LocationDataService, ServiceRefDataService, WASupportedJurisdictionsService, WorkAllocationFeatureService, WorkAllocationTaskService } from './services';
import { workAllocationRouting } from './work-allocation-feature.routes';

// from containers
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    MatDialogModule,
    WorkAllocationComponentsModule,
    PipesModule,
    workAllocationRouting,
    CdkTableModule,
    ExuiCommonLibModule,
    PriorityFieldComponentModule,
    ReactiveFormsModule,
    RoleAccessModule,
    PaginationModule,
    NgxPaginationModule
  ],
  declarations: [...fromContainers.containers],
  providers: [
    WorkAllocationTaskService,
    WorkAllocationAccessGuard,
    AlertService,
    BookingService,
    CaseworkerDataService,
    LocationDataService,
    WorkAllocationFeatureService,
    WASupportedJurisdictionsService,
    ServiceRefDataService,
    LoadingService,
    SessionStorageService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkAllocationModule {
}
