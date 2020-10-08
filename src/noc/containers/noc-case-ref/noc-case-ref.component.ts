import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NocNavigationEvent } from 'src/noc/models/noc-navigation-event.enum';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-case-ref',
  templateUrl: 'noc-case-ref.component.html'
})
export class NocCaseRefComponent implements OnChanges {

  @Input() navEvent: NocNavigationEvent = null;

  public nocNavigationCurrentState$: Observable<fromFeature.State>;

  constructor(
    private store: Store<fromFeature.State>,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.navEvent) {
      this.navigationHandler(this.navEvent);
    }
  }

  navigationHandler(navEvent: NocNavigationEvent) {
    switch (navEvent) {
      case NocNavigationEvent.BACK: {
        console.log('BACK');
        break;
      }
      case NocNavigationEvent.CONTINUE: {
        console.log('CONTINUE');
        break;
      }
    }
  }
}
