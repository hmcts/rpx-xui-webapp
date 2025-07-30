import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertArrayToString',
    standalone: false
})
export class ConvertArrayToStringPipe implements PipeTransform {
  public transform(reasons: string[]): any {
    return reasons.join(', ');
  }
}
