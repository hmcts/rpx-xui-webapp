import { Pipe, PipeTransform } from '@angular/core';
import { LovRefDataModel } from '../models/lovRefData.model';
import { HearingsUtils } from '../utils/hearings.utils';

@Pipe({
  standalone: false,

  name: 'convertToValue'

})
export class ConvertToValuePipe implements PipeTransform {
  public transform(key: string, lovRefDataModels: LovRefDataModel[]): any {
    return HearingsUtils.getValue(key, lovRefDataModels);
  }
}
