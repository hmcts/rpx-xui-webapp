import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: false,
  name: 'rpxTranslate'
})
export class MockRpxTranslatePipe implements PipeTransform {
  public transform(value) {
    return value;
  }
}
