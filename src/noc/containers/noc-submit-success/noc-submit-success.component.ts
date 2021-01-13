import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NocState } from '../../models';
import * as fromFeature from '../../store';


@Component({
  selector: 'exui-noc-submit-success',
  templateUrl: './noc-submit-success.component.html',
  styleUrls: ['./noc-submit-success.component.scss']
})
export class NocSubmitSuccessComponent implements OnInit {

  public caseReference$: Observable<string>;
  public currentNavigation$: Observable<NocState>;
  public nocState = NocState;

  constructor(private readonly store: Store<fromFeature.State>) { }

  public ngOnInit() {
    this.caseReference$ = this.store.pipe(select(fromFeature.caseReference));
    this.currentNavigation$ = this.store.pipe(select(fromFeature.currentNavigation));
  }

}
