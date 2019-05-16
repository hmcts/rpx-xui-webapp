import {Component, OnInit, ViewEncapsulation} from '@angular/core';

/**
 * Entry component wrapper for CCD-CASE-CREATE
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-filter-case',
  template: `<exui-page-wrapper [title]="'Case Filter'">
    <a routerLink="/cases/case-create" class="button">Create case</a></exui-page-wrapper>`,
  encapsulation: ViewEncapsulation.None
})
export class CaseFilterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }

}
