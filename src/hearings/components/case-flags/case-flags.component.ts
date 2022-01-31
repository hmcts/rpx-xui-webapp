import { Component, Input } from '@angular/core';
import * as _ from 'underscore';
import { CaseFlagReferenceModel } from '../../models/caseFlagReference.model';

@Component({
  selector: 'exui-case-flags',
  templateUrl: './case-flags.component.html',
  styleUrls: ['./case-flags.component.scss']
})
export class CaseFlagsComponent {
  public static ACTIVE = 'ACTIVE';
  public static PARTY_NAME = 'partyName';
  public caseFlagsRefDataFiltered: CaseFlagReferenceModel[];
  @Input() public level: number = 1;
  @Input() public info: string;
  @Input() public set caseFlagsRefData(caseFlagReferenceModels: CaseFlagReferenceModel[]) {
    this.caseFlagsRefDataFiltered = caseFlagReferenceModels.filter(caseFlagReferenceModel => caseFlagReferenceModel.isVisible);
  }
}
