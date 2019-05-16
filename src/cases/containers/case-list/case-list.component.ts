import {Component, OnInit, ViewEncapsulation} from '@angular/core';

/**
 * Entry component wrapper for Case List
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
  constructor() {}

  ngOnInit(): void {

  }

}
