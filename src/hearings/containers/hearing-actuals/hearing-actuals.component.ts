import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as hearingActualsActions from '../../store/actions/hearing-actuals.action';
import * as hearingRequestActions from '../../store/actions/hearing-request.action';

@Component({
  standalone: false,
  selector: 'exui-hearing-actuals',
  templateUrl: './hearing-actuals.component.html',
  styleUrls: ['./hearing-actuals.component.scss']
})
export class HearingActualsComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  public constructor(private readonly store: Store<any>, private readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.store.dispatch(new hearingRequestActions.LoadHearingRequest({ hearingID: params.id, targetURL: '', caseRef: '1234' }));
      this.store.dispatch(new hearingActualsActions.GetHearingActuals(params.id));
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
