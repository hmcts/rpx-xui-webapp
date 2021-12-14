import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import * as _ from 'underscore';
import * as fromHearingStore from '../../../../hearings/store';
import {CaseFlagGroup} from '../../../models/caseFlagGroup.model';
import {ACTION} from '../../../models/hearings.enum';
import {PartyFlagsModel} from '../../../models/partyFlags.model';
import {ServiceHearingValuesModel} from '../../../models/serviceHearingValues.model';
import {HearingsService} from '../../../services/hearings.service';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-requirements',
  templateUrl: './hearing-requirements.component.html',
  styleUrls: ['./hearing-requirements.component.scss']
})
export class HearingRequirementsComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {
  public hearingStoreSub: Subscription;
  public hearingValueModel: ServiceHearingValuesModel;
  public caseFlags: CaseFlagGroup[];

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService);
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

  protected executeAction(action: ACTION): void {
    super.navigateAction(action);
  }

  public ngOnDestroy() {
    super.unsubscribe();
    this.hearingStoreSub.unsubscribe();
  }
}
