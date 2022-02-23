import {Component} from '@angular/core';
import {ACTION} from '../../models/hearings.enum';
import {HearingsService} from '../../services/hearings.service';

@Component({
  selector: 'exui-hearing-actuals',
  templateUrl: './hearing-actuals.component.html',
  styleUrls: ['./hearing-actuals.component.scss']
})
export class HearingActualsComponent {

  constructor(private readonly hearingsService: HearingsService) {
  }

  public onBack(): void {
    this.hearingsService.navigateAction(ACTION.BACK);
  }

  public onSubmit(): void {
    this.hearingsService.navigateAction(ACTION.SUBMIT);
  }
}
