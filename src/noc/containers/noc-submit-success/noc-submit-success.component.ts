import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { NocState } from '../../models';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-submit-success',
  templateUrl: './noc-submit-success.component.html',
  styleUrls: ['./noc-submit-success.component.scss']
})
export class NocSubmitSuccessComponent implements OnInit {
  public caseReference$: Observable<string>;
  public currentNavigation$: Observable<NocState>;
  public nocState = NocState;
  private jurisdictionSubscription: Subscription;
  public jurisdiction: string;
  public caseType: string;

  constructor(private readonly store: Store<fromFeature.State>,
    // private readonly jurisdictionService: JurisdictionService
  ) {
    // this.jurisdictionSubscription = this.jurisdictionService.getSelectedJurisdiction()?.subscribe({
    //   next: (jurisdiction) => {
    //     if (jurisdiction?.currentCaseType) {
    //       this.jurisdiction = jurisdiction.id;
    //       this.caseType = jurisdiction.currentCaseType.id
    //     }
    //   }
    // });
  }

  public ngOnInit() {
    this.caseReference$ = this.store.pipe(select(fromFeature.caseReference));
    this.currentNavigation$ = this.store.pipe(select(fromFeature.currentNavigation));
  }

  // public ngOnDestroy(): void {
  //   if (this.jurisdictionSubscription) {
  //     this.jurisdictionSubscription.unsubscribe();
  //   }
  // }
}
