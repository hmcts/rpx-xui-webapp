import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as actions from '../../store/actions/hearing-actuals.action';

@Component({
  selector: 'exui-hearing-actuals',
  templateUrl: './hearing-actuals.component.html',
  styleUrls: ['./hearing-actuals.component.scss']
})
export class HearingActualsComponent implements OnInit, OnDestroy {

  private sub: Subscription;

  public constructor(private store: Store<any>, private readonly route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.store.dispatch(new actions.GetHearingActuals(params.id));
    });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.store.dispatch(new actions.ResetHearingActuals());
  }
}
