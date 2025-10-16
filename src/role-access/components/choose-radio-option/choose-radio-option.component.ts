import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OptionsModel } from '../../models/options-model';

@Component({
  standalone: false,
  selector: 'exui-choose-radio-option',
  templateUrl: './choose-radio-option.component.html',
  styleUrls: ['./choose-radio-option.component.scss']
})

export class ChooseRadioOptionComponent {
  @Input() public title: string;
  @Input() public caption: string;
  @Input() public optionsList: OptionsModel[];
  @Input() public formGroup: FormGroup;
  @Input() public radioControlName: string;
  @Input() public description: string = null;
  @Input() public submitted: boolean = false;
  @Input() public errorText: string = 'Please select an option';
}
