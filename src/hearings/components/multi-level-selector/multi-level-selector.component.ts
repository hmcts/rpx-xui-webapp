import { AfterViewInit, Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlTypeEnum } from '../../models/hearings.enum';

@Component({
  selector: 'exui-multi-level-selector',
  templateUrl: './multi-level-selector.component.html',
  styleUrls: ['./multi-level-selector.component.scss']
})
export class MultiLevelSelectorComponent implements AfterViewInit {
  @Input() public multiLevelSelect: FormArray;
  @Input() public configLevels: { level: number, controlType: ControlTypeEnum }[];
  @Input() public hasValidationRequested: boolean = false;
  @Input() public level: number = 1;
  public formGroup: FormGroup;
  constructor(public fb: FormBuilder) {
    this.formGroup = fb.group({ item: ['', Validators.required] });
    this.formGroup.controls.item.valueChanges.subscribe(value => {
      (this.multiLevelSelect as FormArray).controls.forEach(x => {
        x.value.selected = false;
      });
      (this.multiLevelSelect as FormArray).controls.filter(x => x.value.key === value).forEach(x => {
        x.value.selected = true;
      });
    });
  }

  ngAfterViewInit(): void {
    this.assignSelectedOptionToItemControl();
  }

  public assignSelectedOptionToItemControl(): void {
    if (this.controlType === ControlTypeEnum.SELECT) {
      (this.multiLevelSelect as FormArray).controls
        .filter(control => control.value && control.value.selected)
        .forEach(selectedControl => this.formGroup.controls.item.setValue(selectedControl.value.key));
    }
  }

  public deSelectChildNodes(control: AbstractControl): void {
    if (control.value && control.value.child_nodes && control.value.child_nodes.length) {
      control.value.child_nodes.forEach(node => {
        node.selected = false;
      });
    }
  }

  public get controlType(): ControlTypeEnum {
    return this.configLevels[this.level - 1].controlType;
  }

  public get checkValidationWhenRequested() {
    if (this.hasValidationRequested) {
      return this.formGroup.controls.item.valid;
    }
    return true;
  }

  public get controlCategory() {
    return ControlTypeEnum;
  }

  public getValue(value: FormGroup): FormArray {
    return value.controls.child_nodes as FormArray;
  }
}
