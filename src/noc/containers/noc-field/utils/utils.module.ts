import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CaseReferencePipe } from './case-reference.pipe';
import { DateTimePipe } from './date-time.pipe';
import { NocErrorPipe } from './noc-error.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CaseReferencePipe,
    DateTimePipe,
    NocErrorPipe,
  ],
  exports: [
    CaseReferencePipe,
    DateTimePipe,
    NocErrorPipe
  ]
})
export class UtilsModule {}
