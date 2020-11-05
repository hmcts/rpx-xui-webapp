import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatDialogModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import {SharedModule} from '../app/shared/shared.module';
// from containers
import * as fromContainers from './containers';
import { workAllocationRouting } from './work-allocation-feature.routes';

@NgModule( {
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        HttpModule,
        MatDialogModule,
        workAllocationRouting,
        CdkTableModule,
    ],
  declarations: [...fromContainers.containers],
  providers: [
  ]
})

export class WorkAllocationModule {

}
