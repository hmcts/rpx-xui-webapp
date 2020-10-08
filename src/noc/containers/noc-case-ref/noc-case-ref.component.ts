import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-case-ref',
  templateUrl: 'noc-case-ref.component.html'
})
export class NocCaseRefComponent {

  public nocNavigationCurrentState$: Observable<fromFeature.State>;

  constructor(
    private store: Store<fromFeature.State>,
  ) { }


}
