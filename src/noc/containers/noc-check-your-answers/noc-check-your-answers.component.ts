import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NocAnswer } from '../../models';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-check-your-answers',
  templateUrl: './noc-check-your-answers.component.html',
  styleUrls: ['./noc-check-your-answers.component.scss']
})
export class NocCheckYourAnswersComponent {
  @Input()
  public answers$: Observable<NocAnswer[]>;

  constructor(private store: Store<fromFeature.State>) {  }

  public onChange(answer: NocAnswer) {
    this.store.dispatch(new fromFeature.ChangeNavigation(null));
  }
}
