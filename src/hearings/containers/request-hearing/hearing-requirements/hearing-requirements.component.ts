import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ServiceHearingValuesModel } from 'api/hearings/models/serviceHearingValues.model';
import { Subscription } from 'rxjs';
import { PartyFlagsModel } from 'src/hearings/models/partyFlags.model';
import * as _ from 'underscore';

import { CaseFlagGroup } from '../../../../../api/hearings/models/case-flag-group.model';
import * as fromHearingStore from '../../../../hearings/store';

@Component({
  selector: 'exui-hearing-requirements',
  templateUrl: './hearing-requirements.component.html',
  styleUrls: ['./hearing-requirements.component.scss']
})
export class HearingRequirementsComponent implements OnInit, OnDestroy {
  public hearingRequirementForm: FormGroup;
  public hearingStoreSub: Subscription;
  public hearingValueModel: ServiceHearingValuesModel;
  public caseFlags: CaseFlagGroup[];

  constructor(private readonly hearingStore: Store<fromHearingStore.State>) {
  }

  public convertMapToArray(caseFlags: Record<string, PartyFlagsModel[]>): CaseFlagGroup[] {
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

  public ngOnInit() {
    this.hearingStoreSub = this.hearingStore.pipe(select(fromHearingStore.getHearingValuesModel)).subscribe(
    hearingValueModel => {
      this.assignHearingValue(hearingValueModel);
    });
  }

  public assignHearingValue(hearingValueModel: any) {
    this.hearingValueModel = hearingValueModel;
    if (this.hearingValueModel && this.hearingValueModel.caseFlags) {
      const caseFlags = _.groupBy(this.hearingValueModel.caseFlags.flags, 'partyName');
      this.caseFlags = this.convertMapToArray(caseFlags);
    }
  }

  public ngOnDestroy() {
    this.hearingStoreSub.unsubscribe();
  }
}
