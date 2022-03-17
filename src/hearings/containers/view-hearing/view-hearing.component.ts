import { Component, OnInit } from '@angular/core';
import { ACTION } from '../../../hearings/models/hearings.enum';
import { HearingsService } from '../../../hearings/services/hearings.service';

@Component({
  selector: 'exui-view-hearing',
  templateUrl: './view-hearing.component.html',
  styleUrls: ['./view-hearing.component.scss']
})
export class ViewHearingComponent implements OnInit {

  constructor(private readonly hearingsService: HearingsService) { }

  public ngOnInit(): void {
  }

  public onBack(): void {
    this.hearingsService.navigateAction(ACTION.BACK);
  }
}
