import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'exui-access-denied',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './access-denied.component.html',
})
export class AccessDeniedComponent {}
