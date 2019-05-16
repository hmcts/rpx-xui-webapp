import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as fromCaseCreate from '../../store';
import {Store} from '@ngrx/store';

/**
 * Entry component wrapper for CCD-CASE-CREATE
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-filter-case',
  template: `<h1>FILTER CASE</h1>
  <a routerLink="/cases/case-create" class="button">Create case</a>`,
  encapsulation: ViewEncapsulation.None
})
export class CaseFilterComponent implements OnInit {
  constructor(private store: Store<fromCaseCreate.CasesState>) {}

  ngOnInit(): void {
  }

}
