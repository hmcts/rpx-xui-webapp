import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as fromCaseCreate from '../../store';
import {Store} from '@ngrx/store';
/**
 * Entry component wrapper for Case Search
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-create-case',
  template: `
    <exui-page-wrapper [title]="'Case List'">
    <a routerLink="/cases/case-filter" class="button">Create case</a>
    <a routerLink="/cases/case-search" class="button">Search</a>
    </exui-page-wrapper>
  `,
  encapsulation: ViewEncapsulation.None
})
export class CaseListComponent implements OnInit {
  constructor(private store: Store<fromCaseCreate.CasesState>) {}

  ngOnInit(): void {

  }

}
