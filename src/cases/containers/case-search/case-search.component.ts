import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as fromCaseCreate from '../../store';
import {Store} from '@ngrx/store';

/**
 * Entry component wrapper for CCD-CASE-CREATE
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-search-case',
  template: `<h1>Case Search</h1>`,
  encapsulation: ViewEncapsulation.None
})
export class CaseSearchComponent implements OnInit {
  constructor(private store: Store<fromCaseCreate.CasesState>) {}

  ngOnInit(): void {
  }

}
