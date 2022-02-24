import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ACTION } from '../../models/hearings.enum';
import { HearingsService } from '../../services/hearings.service';
import * as actions from '../../store/actions/hearing-actuals.action';

@Component({
  selector: 'exui-hearing-actuals',
  templateUrl: './hearing-actuals.component.html',
  styleUrls: ['./hearing-actuals.component.scss']
})
export class HearingActualsComponent implements OnInit, OnDestroy {

  private sub: Subscription;

  constructor(private readonly hearingsService: HearingsService, private store: Store<any>) {
  }

  public ngOnInit(): void {
    this.store.dispatch(new actions.GetHearingActuals('1'));
  }

  public onBack(): void {
    this.hearingsService.navigateAction(ACTION.BACK);
  }

  public onSubmit(): void {
    this.hearingsService.navigateAction(ACTION.SUBMIT);
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
