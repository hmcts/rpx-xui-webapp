import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rpxTranslate',
    standalone: false
})
export class MockRpxTranslatePipe implements PipeTransform {
  public transform(value) {
    return value;
  }
}
