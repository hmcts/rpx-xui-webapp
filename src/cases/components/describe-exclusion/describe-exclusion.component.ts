import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'exui-describe-exclusion',
  templateUrl: './describe-exclusion.component.html'
})
export class DescribeExclusionComponent {
  @Input() public title: string;
  @Input() public controlName: string;
  @Input() public description: string;
  @Input() public formGroup: FormGroup;
}
