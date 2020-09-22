import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-home',
  templateUrl: 'noc-home.component.html',
  styleUrls: ['noc-home.component.scss']
})
export class NocHomeComponent {

  constructor(
    private store: Store<fromFeature.State>,
  ) { }

}
