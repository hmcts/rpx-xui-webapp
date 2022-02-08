import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ControlTypeEnum } from '../../models/hearings.enum';

@Component({
  selector: 'exui-multi-level-selector',
  templateUrl: './multi-level-selector.component.html',
  styleUrls: ['./multi-level-selector.component.scss']
})
export class MultiLevelSelectorComponent {
  @Input() public multiLevelSelect: FormArray;
  @Input() public configLevels: { level: number, controlType: ControlTypeEnum }[];
  @Input() public level: number = 1;
  public formGroup: FormGroup;
  constructor(public fb: FormBuilder) {
    this.formGroup = fb.group({ item: [''] });
    this.formGroup.controls.item.valueChanges.subscribe(value => {
      (this.multiLevelSelect as FormArray).controls.filter(x => x.value.key === value).forEach(x => {
        x.value.selected = true;
      });
    });
  }

  public get controlType(): ControlTypeEnum {
    return this.configLevels[this.level - 1].controlType;
  }

  public get controlCategory() {
    return ControlTypeEnum;
  }

  public getValue(value: FormGroup): FormArray {
    return value.controls.child_nodes as FormArray;
  }
}
