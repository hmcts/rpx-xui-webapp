import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromHearingStore from '../../../../hearings/store';
import {CaseFlagReferenceModel} from '../../../models/caseFlagReference.model';
import {ACTION, CaseFlagType} from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-requirements',
  templateUrl: './hearing-requirements.component.html',
})
export class HearingRequirementsComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {
  public caseFlagsRefData: CaseFlagReferenceModel[];
  public caseFlagType: CaseFlagType = CaseFlagType.REASONABLE_ADJUSTMENT;
  public lostFocus: boolean = false;
  public referenceId: string;

  @HostListener('window:focus', ['$event'])
  public onFocus(): void {
    if (this.lostFocus) {
      this.hearingStore.dispatch(new fromHearingStore.LoadHearingValues(this.referenceId));
      this.lostFocus = false;
    }
  }

  @HostListener('window:blur', ['$event'])
  public onBlur(): void {
    this.lostFocus = true;
  }

  constructor(private readonly route: ActivatedRoute,
              public readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService);
    this.caseFlagsRefData = this.route.snapshot.data.caseFlags;
  }

  public ngOnInit() {
    this.referenceId = this.hearingListMainModel.caseRef;
  }

  protected executeAction(action: ACTION): void {
    super.navigateAction(action);
  }

  public ngOnDestroy() {
    super.unsubscribe();
  }
}
