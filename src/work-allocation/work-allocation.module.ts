import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatDialogModule } from '@angular/material';
import {SharedModule} from '../app/shared/shared.module';
// from containers
import * as fromContainers from './containers';
import { casesRouting } from './work-allocation-feature.routes';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        HttpModule,
        MatDialogModule,
        casesRouting
    ],
  declarations: [...fromContainers.containers],
  providers: [
  ]
})

export class WorkAllocationModule {

}
