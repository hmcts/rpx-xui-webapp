import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CaseFlagGroup } from 'api/hearings/models/case-flag-group.model';
import { ServiceHearingValuesModel } from 'api/hearings/models/serviceHearingValues.model';
import groupBy from 'lodash/groupBy';
import { Subscription } from 'rxjs';
import { PartyFlagsModel } from '../../../../../api/hearings/models/partyFlags.model';
import * as fromHearingStore from '../../../../hearings/store';
// import { CaseFlagGroup } from '../../../../../api/hearings/models/case-flag-group.model';

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) { previous[group] = []; }
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);
@Component({
  selector: 'xui-hearing-requirements',
  templateUrl: './hearing-requirements.component.html',
  styleUrls: ['./hearing-requirements.component.scss']
})
export class HearingRequirementsComponent implements OnInit {
  public hearingRequirmentForm: FormGroup;
  public hearingStoreSub: Subscription;
  public hearingValueModel: ServiceHearingValuesModel;
  public caseFlags: CaseFlagGroup[];
  // public caseFlags: Record<string, PartyFlagsModel[]>;

  constructor(private readonly route: ActivatedRoute,
              private readonly hearingStore: Store<fromHearingStore.State>,
              fb: FormBuilder) {
    this.hearingRequirmentForm = fb.group({
    'stage-option': [null],
    });
  }

  public convertMapToArray(caseFlags: Record<string, PartyFlagsModel[]>): CaseFlagGroup[] {
    const caseFlagGroups = [];
    // tslint:disable-next-line: forin
    for (const caseFlag in caseFlags) {
        caseFlagGroups.push(
          {
            name: caseFlag,
            partyFlags: caseFlags[caseFlag]
          } as CaseFlagGroup);
    }
    return caseFlagGroups;
  }

  public ngOnInit() {
    this.hearingStoreSub = this.hearingStore.pipe(select(fromHearingStore.getHearingValuesModel)).subscribe(
    hearingValueModel => {
      this.hearingValueModel = hearingValueModel;
      if (this.hearingValueModel && this.hearingValueModel.caseFlags) {
        // this.caseFlags = this.groupBy(this.hearingValueModel.caseFlags.flags);
        const caseFlags = groupBy(this.hearingValueModel.caseFlags.flags, i => i.partyName);
        this.caseFlags = this.convertMapToArray(caseFlags);
      }

      console.log(this.caseFlags);
    });
  }
}
// ServiceHearingValuesModel

// caseFlags: {
//   flags: [
//     {
//       partyName: 'Jane and Smith',
//       flagId: 'Language Interpreter',
//       flagDescription: 'Spanish interpreter required',
//       flagStatus: 'ACTIVE',
//     },
//     {
//       partyName: 'Jane and Smith',
//       flagId: 'Sign language interpreter',
//       flagDescription: 'Sign language interpreter required',
//       flagStatus: 'ACTIVE',
//     },
//     {
//       partyName: 'Jane and Smith',
//       flagId: 'Reasonable adjustment',
//       flagDescription: 'Hearing loop required',
//       flagStatus: 'ACTIVE',
//     },
//     {
//       partyName: 'DWP',
//       flagId: 'case flag 1',
//       flagDescription: 'case flag 1 description',
//       flagStatus: 'ACTIVE',
//     },
//   ],
