import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {CaseFlagReferenceModel} from '../../../models/caseFlagReference.model';
import {ACTION, CaseFlagType} from '../../../models/hearings.enum';
import {ServiceHearingValuesModel} from '../../../models/serviceHearingValues.model';
import {HearingsService} from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-facilities',
  templateUrl: './hearing-facilities.component.html',
})
export class HearingFacilitiesComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {
  public hearingStoreSub: Subscription;
  public hearingValueModel: ServiceHearingValuesModel;
  public caseFlagsRefData: CaseFlagReferenceModel[];
  public caseFlagType: CaseFlagType = CaseFlagType.NON_REASONABLE_ADJUSTMENT;

  constructor(private readonly route: ActivatedRoute,
              protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService);
    this.caseFlagsRefData = this.route.snapshot.data.caseFlags;
  }

  public ngOnInit() {
    this.hearingStoreSub = this.hearingStore.pipe(select(fromHearingStore.getHearingValuesModel)).subscribe(
      hearingValueModel => {
        this.hearingValueModel = hearingValueModel;
      });
  }

  public executeAction(action: ACTION): void {
    if (this.isFormValid()) {
      super.navigateAction(action);
    }
  }

  public isFormValid(): boolean {
    // TODO verify if form group is valid
    return true;
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}

