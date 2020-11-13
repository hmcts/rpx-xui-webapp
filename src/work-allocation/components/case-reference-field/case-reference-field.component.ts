import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'exui-case-reference-field',
  templateUrl: './case-reference-field.component.html'
})
export class CaseReferenceFieldComponent implements OnChanges {
  /**
   * The caseReference to use for display purposes.
   */
  @Input() public caseReference: string;

  private pHref: string;
  public ngOnChanges(): void {
    if (this.caseReference) {
      // Get rid of the spaces in the caseReference.
      const caseId = this.caseReference.replace(/\s/g, '');
      this.pHref = `/cases/case-details/${caseId}`;
    } else {
      this.pHref = '';
    }
  }

  public get href(): string {
    return this.pHref;
  }
}
