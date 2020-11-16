import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-answer-error',
  templateUrl: './noc-answer-error.component.html',
  styleUrls: ['./noc-answer-error.component.scss']
})
export class NocAnswerErrorComponent implements OnInit {

  public lastError$: Observable<any>;

  constructor(private readonly store: Store<fromFeature.State>) {
  }

  public ngOnInit() {
    this.lastError$ = this.store.pipe(select(fromFeature.lastError));
  }

}
