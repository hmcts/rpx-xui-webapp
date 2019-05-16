import {Component, OnInit, ViewEncapsulation} from '@angular/core';

/**
 * Entry component wrapper for CCD-CASE-CREATE
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-search-case',
  template: `<exui-page-wrapper [title]="'Search'"></exui-page-wrapper>`,
  encapsulation: ViewEncapsulation.None
})
export class CaseSearchComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }

}
