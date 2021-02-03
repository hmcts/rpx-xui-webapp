import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NocHttpError, NocNavigation } from 'src/noc/models';
import { NoCErrorMap } from '../../constants/nocErrorMap.enum';
import * as fromFeature from '../../store';

@Component({
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

  public ngOnChanges(changes: SimpleChanges) {
    this.lastError$ = this.store.pipe(select(fromFeature.lastError));
  }

}
