import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluckAndJoin'
})
export class PluckAndJoinPipe implements PipeTransform {
  public transform(value: { [x: string]: any }[], propertyName: string, separator = ''): string {
    return value ? value.map(item => item[propertyName]).join(separator) : '';
  }
}
