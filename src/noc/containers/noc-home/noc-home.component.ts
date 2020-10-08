import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NocNavigationEvent } from 'src/noc/models/noc-navigation-event.enum';
import { NocState } from '../../models/noc-state.enum';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-home',
  templateUrl: 'noc-home.component.html',
  styleUrls: ['noc-home.component.scss']
})
export class NocHomeComponent implements OnInit{

  public nocNavigationCurrentState$: Observable<fromFeature.State>;
  public nocState = NocState;
  public navEvent: NocNavigationEvent;

  constructor(
    private store: Store<fromFeature.State>,
  ) { }

  ngOnInit() {
    this.nocNavigationCurrentState$ = this.store.pipe(select(fromFeature.currentNavigation));
  }

  public onNavEvent(event: NocNavigationEvent) {
    this.navEvent = event;
  }

  public isComponentVisible(currentNavigationState: NocState, requiredNavigationState: NocState): boolean {
    return currentNavigationState === requiredNavigationState;
  }

}
