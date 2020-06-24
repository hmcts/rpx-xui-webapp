import { Component, Input, OnInit } from '@angular/core';
import { SharedCase } from '../../models/case-share/case-share.module';
import { Store } from '@ngrx/store';
import * as fromCaseList from '../../store/reducers';
import { Observable } from 'rxjs';
import { LoadShareCase } from '../../store/actions';

@Component({
  selector: 'exui-case-share',
  templateUrl: './case-share.component.html',
  styleUrls: ['./case-share.component.scss']
})
export class CaseShareComponent implements OnInit {

  @Input() backLink: string;

  public shareCaseList$: Observable<SharedCase[]>;
  public loading$: Observable<boolean>;
  public error$: Observable<Error>;

  constructor(public store: Store<fromCaseList.State>) {
    this.backLink = 'cases';
  }

  ngOnInit() {
    this.shareCaseList$ = this.store.select(store => store.caseShare.shareCases);
    this.loading$ = this.store.select(store => store.caseShare.loading);
    this.error$ = this.store.select(store => store.caseShare.error);
    // this.store.dispatch(new LoadShareCase());
  }

}
