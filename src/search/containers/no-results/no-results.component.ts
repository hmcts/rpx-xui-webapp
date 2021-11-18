import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(private readonly route: ActivatedRoute) { }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.messageId = id === null || id === undefined ? NoResultsMessageId.ERROR : Number(id);
  }
}
