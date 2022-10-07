import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caseReference'
})
export class CaseReferencePipe implements PipeTransform {

  public transform(caseReference: string): string {
    if (!caseReference) {
      return '';
    }
    return String(caseReference).replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
  }
}
