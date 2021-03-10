import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NocHttpError } from '../../models';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-affirmation',
  templateUrl: './noc-affirmation.component.html',
  styleUrls: ['./noc-affirmation.component.scss']
})
export class NocAffirmationComponent implements OnInit {

  @Input()
  public affirmationAgreed: boolean = false;

  public validationErrors$: Observable<NocHttpError>;

  constructor(private readonly store: Store<fromFeature.State>) { }

  public ngOnInit() {
    this.validationErrors$ = this.store.pipe(select(fromFeature.validationErrors));
  }

  public onChangeAffirmation(event: any) {
    this.store.dispatch(new fromFeature.SetAffirmationAgreed(event.currentTarget.checked));
  }

}
