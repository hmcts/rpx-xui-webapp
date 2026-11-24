import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RestrictedCase } from '../../models/restricted-case.model';

@Component({
  standalone: false,
  selector: 'exui-restricted-case-access',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './restricted-case-access.component.html',
})
export class RestrictedCaseAccessComponent {
  @Input() restrictedCases: RestrictedCase[];
}
