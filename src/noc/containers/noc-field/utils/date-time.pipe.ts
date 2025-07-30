import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatDateTime',
    standalone: false
})
export class DateTimePipe implements PipeTransform {
  public transform(value: string): string {
    return value.replace('T', ' ').replace('.000', '');
  }
}
