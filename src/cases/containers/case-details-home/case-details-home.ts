import { Component, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
@Component({
  selector: 'exui-case-details-home',
  templateUrl: './case-details-home.html',

})
export class CaseDetailsHomeComponent implements AfterContentChecked {
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
}

