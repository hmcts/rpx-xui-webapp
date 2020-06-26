import { Component, Input, OnInit } from '@angular/core';
import { UserDetails } from '@hmcts/rpx-xui-common-lib/lib/models/user-details.module';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SharedCase } from '../../models/case-share/case-share.module';
import {DeleteAShareCase} from '../../store';
import * as fromCasesFeature from '../../store';
import { LoadShareCase, LoadUserFromOrgForCase } from '../../store/actions';
import * as fromCaseList from '../../store/reducers';

@Component({
  selector: 'exui-case-share',
  templateUrl: './case-share.component.html',
  styleUrls: ['./case-share.component.scss']
})
export class CaseShareComponent implements OnInit {

  @Input() public backLink: string;

  public selectedShareCases$: Observable<SharedCase[]>;
  public shareCases: SharedCase[];
  public loading$: Observable<boolean>;
  public error$: Observable<Error>;
  public orgUsers$: Observable<UserDetails[]>;

  constructor(public store: Store<fromCaseList.State>) {
    this.backLink = 'cases';
  }

  public ngOnInit() {
    this.selectedShareCases$ = this.store.pipe(select(fromCasesFeature.getShareCaseListState));
    this.orgUsers$ = this.store.pipe(select(fromCasesFeature.getOrganisationUsersState));
    this.selectedShareCases$.subscribe(shareCases => {
      this.shareCases = shareCases;
      console.log('shareCases is ', this.shareCases);
    });
    // call api to retrieve case assigned users
    this.store.dispatch(new LoadShareCase(this.shareCases));
    // Hard coded Org Id as this info will come later
    this.store.dispatch(new LoadUserFromOrgForCase('o111111'));
    this.orgUsers$.subscribe(user => console.log(user));
  }

  deselect($event) {
    this.store.dispatch(new DeleteAShareCase($event));
  }

}
