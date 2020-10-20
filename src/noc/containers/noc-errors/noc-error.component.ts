import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NocNavigation, NocNavigationEvent } from 'src/noc/models';
import * as fromFeature from '../../store';

@Component({
    selector: 'exui-noc-error',
    templateUrl: 'noc-error.component.html'
  })

export class NocErrorComponent implements OnChanges {
  @Input() public navEvent: NocNavigation;
  public lastError$: Observable<any>;
  constructor(private readonly store: Store<fromFeature.State>) {
    this.navEvent = {
      event: null,
      timestamp: null
    };
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.lastError$ = this.store.pipe(select(fromFeature.lastError));
    if (changes.navEvent && this.navEvent) {
      this.navigationHandler(this.navEvent.event);
    }
  }

  public navigationHandler(navEvent: NocNavigationEvent) {
    switch (navEvent) {
      case NocNavigationEvent.BACK: {
        this.store.dispatch(new fromFeature.Reset());
        break;
      }
      case NocNavigationEvent.CONTINUE:
      break;
      default:
        throw new Error('Invalid option');
    }
  }
}
