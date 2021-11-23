import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromActions from '../../../app/store';
import { NoResultsMessageId } from '../../enums';

@Component({
  selector: 'exui-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss']
})
export class NoResultsComponent implements OnInit {

  public paramMapSubscription$: Subscription;
  public messageId: number;
  public noResultsMessageId = NoResultsMessageId;

  constructor(private readonly store: Store<fromActions.State>,
              private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.messageId = id === null || id === undefined ? NoResultsMessageId.ERROR : Number(id);
    if (this.messageId === NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH) {
      this.store.dispatch(new fromActions.Decorate16DigitCaseReferenceSearchBox(true));
    }
  }
}
