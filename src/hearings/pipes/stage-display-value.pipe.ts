import { Pipe, PipeTransform } from '@angular/core';
import { LovRefDataModel } from '../models/lovRefData.model';

@Pipe({
  name: 'stageDisplayValue'
})
export class HearingStageDisplayValuePipe implements PipeTransform {

  private static getValue(key: string, stages?: LovRefDataModel[]): string {
    for (const stage of stages) {
      if (stage.child_nodes && stage.child_nodes.length) {
        return HearingStageDisplayValuePipe.getValue(key, stage.child_nodes);
      }
      if (stage.key === key) {
        return stage.value_en;
      }
    }
    return '';
  }

  public transform(key: string, stages?: LovRefDataModel[]): any {
    return HearingStageDisplayValuePipe.getValue(key, stages);
  }
}
