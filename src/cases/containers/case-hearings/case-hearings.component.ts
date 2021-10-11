import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CaseHearingModel } from 'api/hearings/models/caseHearing.model';
import { CaseHearingsMainModel } from 'api/hearings/models/caseHearingsMain.model';

@Component({
  selector: 'exui-case-hearings',
  templateUrl: './case-hearings.component.html',
  styles:[`
    .header-container { margin-top: 30px; }
    .TORQUISE { background-color: purple; padding:5px }
    .GREEN { background-color: green; padding:5px }
    .GREY { background-color: grey; padding:5px }
    .RED { background-color: red; padding:5px}
  `]
})
export class CaseHearingsComponent {
  @Input() caseHearing: CaseHearingsMainModel[];
  @Output() viewHearing = new EventEmitter<CaseHearingModel>();
  @Output() cancelHearing = new EventEmitter<CaseHearingModel>();
  @Output() requestHearing = new EventEmitter<any>();
}
