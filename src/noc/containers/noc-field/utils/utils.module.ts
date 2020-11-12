import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NocErrorPipe } from './noc-error.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NocErrorPipe
  ],
  exports: [
    NocErrorPipe
  ]
})
export class UtilsModule {}
