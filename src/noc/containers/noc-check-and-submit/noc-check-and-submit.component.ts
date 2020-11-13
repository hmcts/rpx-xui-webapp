import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NocAnswer, NocNavigation } from '../../models';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-check-and-submit',
  templateUrl: './noc-check-and-submit.component.html',
  styleUrls: ['./noc-check-and-submit.component.scss']
})
export class NocCheckAndSubmitComponent implements OnInit {
  @Input() navEvent: NocNavigation;
  @Input()
  public answers$: Observable<NocAnswer[]>;

  constructor(private store: Store<fromFeature.State>) {
    this.navEvent = {
      event: null,
      timestamp: null
    };
  }

  public ngOnInit() {
    this.answers$ = this.store.pipe(select(fromFeature.answers));
  }

}
