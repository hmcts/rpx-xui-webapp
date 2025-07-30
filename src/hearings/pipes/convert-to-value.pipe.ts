import { Pipe, PipeTransform } from '@angular/core';
import { LovRefDataModel } from '../models/lovRefData.model';
import { HearingsUtils } from '../utils/hearings.utils';

@Pipe({
    name: 'convertToValue',
    standalone: false
})
export class ConvertToValuePipe implements PipeTransform {
  public transform(key: string, lovRefDataModels: LovRefDataModel[]): any {
    return HearingsUtils.getValue(key, lovRefDataModels);
  }
}
