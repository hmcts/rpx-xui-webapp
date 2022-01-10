import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'underscore';
import {CaseFlagGroup} from '../../models/caseFlagGroup.model';
import {CaseFlagReferenceModel} from '../../models/caseFlagReference.model';
import {CaseFlagType} from '../../models/hearings.enum';
import {PartyFlagsDisplayModel} from '../../models/partyFlags.model';
import {ServiceHearingValuesModel} from '../../models/serviceHearingValues.model';

@Component({
  selector: 'exui-case-flags',
  templateUrl: './case-flags.component.html',
  styleUrls: ['./case-flags.component.scss']
})
export class CaseFlagsComponent implements OnInit {
  public static ACTIVE = 'ACTIVE';
  public static LANGUAGE_INTERPRETER_FLAG_ID = 'PF0015';
  public static PARTY_NAME = 'partyName';
  public caseFlagsGroup: CaseFlagGroup[];

  @Input() public info: string;
  @Input() public hearingValueModel: ServiceHearingValuesModel;
  @Input() public caseFlagsRefData: CaseFlagReferenceModel[];
  @Input() public caseFlagType: CaseFlagType;

  public ngOnInit(): void {
    this.displayCaseFlagsGroup();
  }

  public displayCaseFlagsGroup(): void {
    if (this.hearingValueModel && this.hearingValueModel.caseFlags) {
      let filteredCaseFlags: PartyFlagsDisplayModel[];
      const displayCaseFlags: PartyFlagsDisplayModel[] = this.hearingValueModel.caseFlags.flags.map(flag => {
        const flagPath: CaseFlagReferenceModel = this.findFlagByFlagId(this.caseFlagsRefData, flag.flagId);
        return {
          ...flag,
          displayName: flagPath.name,
          displayPath: flagPath.Path,
        };
      });
      if (this.caseFlagType === CaseFlagType.REASONABLE_ADJUSTMENT) {
        filteredCaseFlags = displayCaseFlags.filter(caseFlag =>
          caseFlag.flagStatus === CaseFlagsComponent.ACTIVE
          && (caseFlag.displayPath.includes(CaseFlagType.REASONABLE_ADJUSTMENT)
          || caseFlag.flagId === CaseFlagsComponent.LANGUAGE_INTERPRETER_FLAG_ID));
      } else {
        filteredCaseFlags = displayCaseFlags.filter(caseFlag =>
          caseFlag.flagStatus === CaseFlagsComponent.ACTIVE
          && !caseFlag.displayPath.includes(CaseFlagType.REASONABLE_ADJUSTMENT)
          && caseFlag.flagId !== CaseFlagsComponent.LANGUAGE_INTERPRETER_FLAG_ID);
      }
      const caseFlags = _.groupBy(filteredCaseFlags, CaseFlagsComponent.PARTY_NAME);
      this.caseFlagsGroup = this.convertMapToArray(caseFlags);
    }
  }

  public findFlagByFlagId(caseFlagReferenceModels: CaseFlagReferenceModel[], flagId: string): CaseFlagReferenceModel {
    let foundFlag = null;
    for (const caseFlag of caseFlagReferenceModels) {
      if (caseFlag.flagCode === flagId) {
        foundFlag = caseFlag;
        break;
      } else {
        if (foundFlag === null && caseFlag.childFlags && caseFlag.childFlags.length > 0) {
          foundFlag = this.findFlagByFlagId(caseFlag.childFlags, flagId);
        }
      }
    }
    return foundFlag;
  }

  public convertMapToArray(caseFlags: Record<string, PartyFlagsDisplayModel[]>): CaseFlagGroup[] {
    const caseFlagGroups = [];
    for (const caseFlag in caseFlags) {
      if (caseFlags.hasOwnProperty(caseFlag)) {
        caseFlagGroups.push(
          {
            name: caseFlag,
            partyFlags: caseFlags[caseFlag]
          } as CaseFlagGroup);
      }
    }
    return caseFlagGroups;
  }
}
