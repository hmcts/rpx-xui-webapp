import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ControlTypeEnum } from '../../models/hearings.enum';

@Component({
    selector: 'exui-multi-level-selector',
    templateUrl: './multi-level-selector.component.html',
    styleUrls: ['./multi-level-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MultiLevelSelectorComponent implements AfterViewInit, OnDestroy {
  @Input() public multiLevelSelect: FormArray;
  @Input() public configLevels: { level: number, controlType: ControlTypeEnum }[];
  @Input() public level: number = 1;
  @Input() public hasValidationRequested: boolean = false;
  public formGroup: FormGroup;
  private readonly subscription: Subscription;
  constructor(public fb: FormBuilder) {
    this.formGroup = fb.group({ item: [''] });
    this.subscription = this.formGroup.controls.item.valueChanges.subscribe((value) => {
      if (this.multiLevelSelect) {
        this.multiLevelSelect.controls.forEach((multiLevel) => {
          multiLevel.value.selected = multiLevel.value.key === value;
        });
      }
    });
  }

  public ngAfterViewInit(): void {
    this.assignSelectedOptionToItemControl();
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

  public assignSelectedOptionToItemControl(): void {
    if (this.controlType === ControlTypeEnum.SELECT) {
      (this.multiLevelSelect as FormArray).controls.forEach((control) => {
        if (control.value && control.value.selected) {
          this.formGroup.controls.item.setValue(control.value.key);
        }
      });
    }
  }

  public deSelectChildNodes(control: AbstractControl): void {
    if (control.value && control.value.child_nodes && control.value.child_nodes.length) {
      control.value.child_nodes.forEach((node) => {
        node.selected = false;
      });
    }
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public get checkValidationWhenRequested() {
    if (this.hasValidationRequested) {
      return this.formGroup.controls.item.value !== '';
    }
    return true;
  }
}
