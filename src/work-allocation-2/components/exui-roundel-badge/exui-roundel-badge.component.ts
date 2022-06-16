import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { AppConstants } from '../../../app/app.constants';

@Component({
  selector: 'exui-roundel-badge',
  templateUrl: './exui-roundel-badge.component.html'
})
export class RoundelBadgeComponent implements OnChanges, OnInit {
  ngOnInit(): void {

  }
  /**
   * The caseName to use for display purposes.
   */
  // @Input() public caseName: string;
  @Input() public isNew: boolean;
  @Input() public rowData: boolean;
  @Input() public field: boolean;

  private pHref: string;
  public ngOnChanges(): void {
    // let href: string;
    // if (this.caseId) {
    //   const caseId = this.caseId;
    //   if (caseId) {
    //     href = `${AppConstants.CASE_DETAILS_URL}${caseId}#overview`;
    //   }
    // }
    // this.pHref = href;
  }

  public get href(): string {
    return this.pHref;
  }
}
