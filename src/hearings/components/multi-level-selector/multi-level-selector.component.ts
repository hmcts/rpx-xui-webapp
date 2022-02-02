import { Component, Input } from '@angular/core';
import { RefDataModel } from '../../../../api/hearings/models/refData.model';

enum ControlType { TextBox, Select, RadioButton, CheckBox }
@Component({
  selector: 'exui-multi-level-selector',
  templateUrl: './multi-level-selector.component.html',
})
export class MultiLevelSelectorComponent {
  @Input() public levelConfigs: { level: number, controlType: ControlType }[];
  @Input() public level: number;
  @Input() public mulipleLevels: RefDataModel[];
  public get controlType(): ControlType {
    return this.levelConfigs[this.level - 1].controlType;
  }
  public get controlTypeEnum() {
    return ControlType;
  }
}
