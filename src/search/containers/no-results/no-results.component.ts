import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'exui-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss']
})
export class NoResultsComponent implements OnInit, OnDestroy {

  public paramMapSubscription$: Subscription;
  public isError: boolean;

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramMapSubscription$ = this.route.paramMap.subscribe(params => {
      this.isError = params.get('error') === 'false' ? false : true;
    });
  }

  ngOnDestroy(): void {
    if (this.paramMapSubscription$) {
      this.paramMapSubscription$.unsubscribe();
    }
  }
}
