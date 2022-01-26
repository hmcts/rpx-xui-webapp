import {Component, Input, OnInit} from '@angular/core';
import {Section} from '../../models/section';

@Component({
  selector: 'exui-hearing-summary',
  templateUrl: './hearing-summary.component.html',
  styleUrls: ['./hearing-summary.component.scss']
})
export class HearingSummaryComponent implements OnInit {

  @Input() public template: Section[];

  public ngOnInit(): void {
  }

}
