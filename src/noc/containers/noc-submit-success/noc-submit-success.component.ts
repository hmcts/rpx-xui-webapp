import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromFeature from '../../store';
import { NocState } from '../../models';

@Component({
  selector: 'exui-noc-submit-success',
  templateUrl: './noc-submit-success.component.html',
  styleUrls: ['./noc-submit-success.component.scss']
})
export class NocSubmitSuccessComponent implements OnInit {

  public caseReference$: Observable<string>;
  public currentNavigation$: Observable<NocState>;
  public nocState = NocState;

  constructor(private store: Store<fromFeature.State>) { }

  ngOnInit() {
    this.caseReference$ = this.store.pipe(select(fromFeature.caseReference));
    this.currentNavigation$ = this.store.pipe(select(fromFeature.currentNavigation));
  }

}
