import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as fromCaseCreate from '../../store';
import {Store} from '@ngrx/store';
/**
 * Entry component wrapper for CCD-CASE-CREATE
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-create-case',
  template: `
    <h1>CASE LIST COMPONENT</h1>
    <a routerLink="case-filter" class="button">Create case</a>
  `,
  encapsulation: ViewEncapsulation.None
})
export class CaseListComponent implements OnInit {
  constructor(private store: Store<fromCaseCreate.CasesState>) {}

  ngOnInit(): void {

  }

}
