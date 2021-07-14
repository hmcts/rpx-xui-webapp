import { FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'exui-describe-exclusion',
  templateUrl: './describe-exclusion.component.html',
  styleUrls: ['./describe-exclusion.component.scss']
})
export class DescribeExclusionComponent {
  @Input() public title: string;
  @Input() public submitted: boolean;
  @Input() public controlName: string;
  @Input() public description: string;
  @Input() public formGroup: FormGroup;
}
