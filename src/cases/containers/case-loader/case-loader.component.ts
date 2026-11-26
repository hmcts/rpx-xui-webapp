import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'exui-case-loader',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<xuilib-loading-spinner></xuilib-loading-spinner>',
})

/**
 * Spinner Component
 */
export class CaseLoaderComponent {}
