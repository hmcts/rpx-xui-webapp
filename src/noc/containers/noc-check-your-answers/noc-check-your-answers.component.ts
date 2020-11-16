import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NocAnswer, NocState } from '../../models';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-check-your-answers',
  templateUrl: './noc-check-your-answers.component.html',
  styleUrls: ['./noc-check-your-answers.component.scss']
})
export class NocCheckYourAnswersComponent {
  @Input()
  public qAndA$: Observable<NocAnswer[]>;

  constructor(private store: Store<fromFeature.State>) {  }

  public onChange(answer: NocAnswer) {
    this.store.dispatch(new fromFeature.ChangeNavigation(NocState.QUESTION));
  }
}
