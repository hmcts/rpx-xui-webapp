import { Component, Input } from '@angular/core';
import { CaseFlagGroup } from '../../models/caseFlagGroup.model';
import { AmendmentLabelStatus } from '../../models/hearingsUpdateMode.enum';

@Component({
  selector: 'exui-case-flags',
  templateUrl: './case-flags.component.html',
  styleUrls: ['./case-flags.component.scss']
})
export class CaseFlagsComponent {
  @Input() public caseFlagsGroup: CaseFlagGroup[];
  @Input() public info: string;

  public amendmentLabelStatus = AmendmentLabelStatus;

  public showLanguage(name: string): boolean {
    return name && name.includes('Language Interpreter');
  }
}
