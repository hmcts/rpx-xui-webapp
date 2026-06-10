import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import * as fromHearingStore from '../../store';
import * as hearingActualsActions from '../../store/actions/hearing-actuals.action';
import * as hearingRequestActions from '../../store/actions/hearing-request.action';

@Component({
  standalone: false,
  selector: 'exui-hearing-actuals',
  templateUrl: './hearing-actuals.component.html',
  styleUrls: ['./hearing-actuals.component.scss'],
})
export class HearingActualsComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  public constructor(
    private readonly store: Store<fromHearingStore.State>,
    private readonly route: ActivatedRoute,
    public readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.sub = this.route.params
      .pipe(withLatestFrom(this.store.pipe(select(fromHearingStore.getHearingValuesCaseInfo))))
      .subscribe(([params, caseInfo]) => {
        const caseRef = caseInfo?.caseReference;
        this.store.dispatch(new hearingRequestActions.LoadHearingRequest({ hearingID: params.id, targetURL: '', caseRef }));
        this.store.dispatch(new hearingActualsActions.GetHearingActuals({ id: params.id, caseRef }));
      });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.store.dispatch(new hearingActualsActions.ResetHearingActuals());
    this.store.dispatch(new hearingRequestActions.ResetHearingRequest());
  }
}
