import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: false,

  name: 'formatDateTime'

})
export class DateTimePipe implements PipeTransform {
  public transform(value: string): string {
    return value.replace('T', ' ').replace('.000', '');
  }
}
