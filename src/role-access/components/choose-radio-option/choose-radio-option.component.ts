import { Component, Input, OnInit } from '@angular/core';

import { RoleAllocationCaptionText } from '../../models/enums';
import { OptionsModel } from '../../models/options-model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'exui-choose-radio-option',
  templateUrl: './choose-radio-option.component.html'
})

export class ChooseRadioOptionComponent implements OnInit {

  @Input() public title: string;
  @Input() public caption: RoleAllocationCaptionText;
  @Input() public optionsList: OptionsModel[];
  @Input() public formGroup: FormGroup;
  @Input() public radioControlName: string;

  constructor() {}

  public ngOnInit(): void {
  }

}
