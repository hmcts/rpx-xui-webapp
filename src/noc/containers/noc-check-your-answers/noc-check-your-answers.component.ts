import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NocAnswer, NocState } from '../../models';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-check-your-answers',
  templateUrl: './noc-check-your-answers.component.html',
  styleUrls: ['./noc-check-your-answers.component.scss']
})
export class NocCheckYourAnswersComponent implements OnInit {

  public caseReference$: Observable<string>;

  @Input()
  public qAndA$: Observable<NocAnswer[]>;

  constructor(private readonly store: Store<fromFeature.State>) {  }

  public ngOnInit() {
    this.caseReference$ = this.store.pipe(select(fromFeature.caseReference));
  }

  public navToRef() {
    this.store.dispatch(new fromFeature.ChangeNavigation(NocState.START));
  }

  public navToQAndA(answer: NocAnswer) {
    this.store.dispatch(new fromFeature.ChangeNavigation(NocState.QUESTION));
  }
}
