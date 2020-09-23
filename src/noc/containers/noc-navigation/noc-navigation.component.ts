import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-navigation',
  templateUrl: 'noc-navigation.component.html',
  styleUrls: ['noc-navigation.component.scss']
})
export class NocNavigationComponent implements OnInit{

  public nocNavigationPreviousState$: Observable<fromFeature.NocNavigationState>;
  public nocNavigationCurrentState$: Observable<fromFeature.NocNavigationState>;
  public nocNavigationNextState$: Observable<fromFeature.NocNavigationState>;

  constructor(
    private store: Store<fromFeature.NocNavigationState>,
  ) { }

  ngOnInit() {
    this.nocNavigationPreviousState$ = this.store.pipe(select(fromFeature.getPreviousNavigation));
    this.nocNavigationCurrentState$ = this.store.pipe(select(fromFeature.getCurrentNavigation));
    this.nocNavigationNextState$ = this.store.pipe(select(fromFeature.getNextNavigation));
  }
}
