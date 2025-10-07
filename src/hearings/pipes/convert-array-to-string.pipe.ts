import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: false,

  name: 'convertArrayToString'

})
export class ConvertArrayToStringPipe implements PipeTransform {
  public transform(reasons: string[]): any {
    return reasons.join(', ');
  }
}
