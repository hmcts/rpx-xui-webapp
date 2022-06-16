import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { AppConstants } from '../../../app/app.constants';

@Component({
  selector: 'exui-roundel-badge',
  templateUrl: './exui-roundel-badge.component.html'
})
export class RoundelBadgeComponent  {

  @Input() public isNew: boolean;
  @Input() public rowData: boolean;
  @Input() public config: boolean;

}
