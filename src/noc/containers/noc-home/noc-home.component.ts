import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NocState } from '../../models/noc.state';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-home',
  templateUrl: 'noc-home.component.html',
  styleUrls: ['noc-home.component.scss']
})
export class NocHomeComponent implements OnInit{

  public nocNavigationCurrentState$: Observable<fromFeature.State>;
  public nocState = NocState;

  constructor(
    private store: Store<fromFeature.State>,
  ) { }

  ngOnInit() {
    this.nocNavigationCurrentState$ = this.store.pipe(select(fromFeature.currentNavigation));
  }

  public back(event) {
    console.log('back event triggered ', event);
  }

  public continue(event) {
    console.log('continue event triggered ', event);
  }

  public submit(event) {
    console.log('submit event triggered ', event);
  }

  public isComponentVisible(currentNavigationState: NocState, requiredNavigationState: NocState): boolean {
    return currentNavigationState === requiredNavigationState;
  }

}
