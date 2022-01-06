import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import * as fromHearingStore from '../../../../hearings/store';
import {CaseFlagReferenceModel} from '../../../models/caseFlagReference.model';
import {ACTION, CaseFlagType} from '../../../models/hearings.enum';
import {ServiceHearingValuesModel} from '../../../models/serviceHearingValues.model';
import {HearingsService} from '../../../services/hearings.service';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-requirements',
  templateUrl: './hearing-requirements.component.html',
})
export class HearingRequirementsComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {
  public hearingValuesSub: Subscription;
  public hearingValueModel: ServiceHearingValuesModel;
  public caseFlagsRefData: CaseFlagReferenceModel[];
  public caseFlagType: CaseFlagType = CaseFlagType.REASONABLE_ADJUSTMENT;
  public lostFocus: boolean = false;
  public hearingListSub: Subscription;
  public referenceId: string;

  @HostListener('window:focus', ['$event'])
  public onFocus(): void {
    console.log('onFocus');
    if (this.lostFocus) {
      this.hearingStore.dispatch(new fromHearingStore.LoadHearingValues(this.referenceId));
      this.lostFocus = false;
    }
  }

  @HostListener('window:blur', ['$event'])
  public onBlur(): void {
    console.log('onBlur');
    this.lostFocus = true;
  }

  constructor(private readonly route: ActivatedRoute,
              protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService);
    this.caseFlagsRefData = this.route.snapshot.data.caseFlags;
  }

  public ngOnInit() {
    this.hearingListSub = this.hearingStore.pipe(select(fromHearingStore.getHearingList)).subscribe(
      hearingList => {
        this.referenceId = hearingList.hearingListMainModel ? hearingList.hearingListMainModel.caseRef : '';
      }
    );
    this.hearingValuesSub = this.hearingStore.pipe(select(fromHearingStore.getHearingValuesModel)).subscribe(
      hearingValueModel => {
        this.hearingValueModel = hearingValueModel;
      });
  }

  protected executeAction(action: ACTION): void {
    super.navigateAction(action);
  }

  public ngOnDestroy() {
    super.unsubscribe();
    if (this.hearingListSub) {
      this.hearingListSub.unsubscribe();
    }
    if (this.hearingValuesSub) {
      this.hearingValuesSub.unsubscribe();
    }
  }
}
