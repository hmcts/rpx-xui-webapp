import { Component, Input, OnChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NoCErrorMap } from '../../constants/nocErrorMap.enum';
import { NocHttpError, NocNavigation } from '../../models';
import * as fromFeature from '../../store';

@Component({
  standalone: false,
  selector: 'exui-noc-error',
  templateUrl: 'noc-error.component.html'

})
export class NocErrorComponent implements OnChanges {
  @Input() public navEvent: NocNavigation;
  public nocErrorMap = NoCErrorMap;
  public lastError$: Observable<NocHttpError>;
  constructor(private readonly store: Store<fromFeature.State>) {
    this.navEvent = {
      event: null,
      timestamp: null
    };
  }

  public ngOnChanges() {
    this.lastError$ = this.store.pipe(select(fromFeature.lastError));
  }
}
