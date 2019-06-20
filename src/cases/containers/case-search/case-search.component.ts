import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCasesFeature from '../../store';

/**
 * Entry component wrapper for CCD-CASE-CREATE
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-search-case',
  templateUrl: 'case-search.component.html',
  styleUrls: ['case-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CaseSearchComponent implements OnInit {

  constructor(
    public store: Store<fromCasesFeature.State>,
  ) {

  }

  ngOnInit(): void {

  }

  applySearchFilter(event) {
    this.store.dispatch(new fromCasesFeature.ApplySearchFilter(event));
  }

}
