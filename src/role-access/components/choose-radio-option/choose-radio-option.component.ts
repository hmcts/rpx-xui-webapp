import { Component, Input } from '@angular/core';

import { RadioOption } from '../../models';
import { RoleAllocationCaptionText, RoleAllocationTitleText } from '../../models/enums';

@Component({
  selector: 'exui-choose-radio-option',
  templateUrl: './choose-radio-option.component.html'
})

export class ChooseRadioOptionComponent {

  @Input() public radios: RadioOption[] = [];
  @Input() public title: RoleAllocationTitleText;
  @Input() public caption: RoleAllocationCaptionText;

  constructor() {}

}
