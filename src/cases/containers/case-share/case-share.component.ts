import { Component, Input, OnInit } from '@angular/core';
import { SharedCase } from '../../models/case-share/case-share.module';
import { select, Store } from '@ngrx/store';
import * as fromCaseList from '../../store/reducers';
import { Observable } from 'rxjs';
import { LoadShareCase } from '../../store/actions';
import * as fromCasesFeature from '../../store';

@Component({
  selector: 'exui-case-share',
  templateUrl: './case-share.component.html',
  styleUrls: ['./case-share.component.scss']
})
export class CaseShareComponent implements OnInit {

  @Input() backLink: string;

  public selectedShareCases$: Observable<SharedCase[]>;
  public shareCases: SharedCase[];
  public loading$: Observable<boolean>;
  public error$: Observable<Error>;

  constructor(public store: Store<fromCaseList.State>) {
    this.backLink = 'cases';
  }

  ngOnInit() {
    this.selectedShareCases$ = this.store.pipe(select(fromCasesFeature.getShareCaseListState));
    this.selectedShareCases$.subscribe(shareCases => this.shareCases = shareCases);
    // call api to retrieve case assigned users
    this.store.dispatch(new LoadShareCase(this.shareCases));
  }

}
