import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CaseReferencePipe } from './case-reference.pipe';
import { NocErrorPipe } from './noc-error.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CaseReferencePipe,
    NocErrorPipe
  ],
  exports: [
    CaseReferencePipe,
    NocErrorPipe
  ]
})
export class UtilsModule {}
