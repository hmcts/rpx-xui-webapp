import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoleAllocationCaptionText } from '../../models/enums';
import { OptionsModel } from '../../models/options-model';

@Component({
  selector: 'exui-choose-radio-option',
  templateUrl: './choose-radio-option.component.html'
})

export class ChooseRadioOptionComponent {

  @Input() public title: string;
  @Input() public caption: RoleAllocationCaptionText;
  @Input() public optionsList: OptionsModel[];
  @Input() public formGroup: FormGroup;
  @Input() public radioControlName: string;
  @Input() public submitted: boolean = false;

  constructor() {}

}
