import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AFFIRMATION_DEFAULT_DISAGREE_ERROR, AFFIRMATION_NOTIFY_EVERY_PARTY_ERROR } from '../../constants/nocErrorMap.enum';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-affirmation',
  templateUrl: './noc-affirmation.component.html',
  styleUrls: ['./noc-affirmation.component.scss']
})
export class NocAffirmationComponent implements OnInit {

  @Input()
  public affirmationAgreed: boolean = false;
  @Input()
  public notifyEveryParty: boolean = false;

  public validationErrors$: Observable<any>;
  public hasDisagreeError$: Observable<boolean>;
  public hasNotifyEveryPartyError$: Observable<boolean>;

  constructor(private readonly store: Store<fromFeature.State>) { }

  public ngOnInit() {
    this.validationErrors$ = this.store.pipe(select(fromFeature.validationErrors));
    this.hasDisagreeError$ = this.validationErrors$.pipe(map(errors => {
      return errors ? errors.hasOwnProperty(AFFIRMATION_DEFAULT_DISAGREE_ERROR.code) : false;
    }));
    this.hasNotifyEveryPartyError$ = this.validationErrors$.pipe(map(errors => {
      return errors ? errors.hasOwnProperty(AFFIRMATION_NOTIFY_EVERY_PARTY_ERROR.code) : false;
    }));
  }

  public onChangeAffirmation(event: any) {
    this.store.dispatch(new fromFeature.SetAffirmationAgreed(event.currentTarget.checked));
  }

  public onNotifyEveryParty(event: any) {
    this.store.dispatch(new fromFeature.SetNotifyEveryParty(event.currentTarget.checked));
  }
}
