import { Component, Input } from '@angular/core';
import { CaseFlagGroup } from '../../models/caseFlagGroup.model';

@Component({
  selector: 'exui-case-flags',
  templateUrl: './case-flags.component.html',
  styleUrls: ['./case-flags.component.scss']
})
export class CaseFlagsComponent {
  @Input() public caseFlagsGroup: CaseFlagGroup[];
  @Input() public info: string;
}
