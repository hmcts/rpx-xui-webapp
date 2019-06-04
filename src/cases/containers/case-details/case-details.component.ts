import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
/**
 * Entry component
 * Dumb Component
 * param TBC
 */
@Component({
  selector: 'exui-case-details',
  template: `
    <h1>Case Details Page</h1>
    <ccd-case-view [hasPrint]="true"
                     [case]="caseId"
                     [hasEventSelector]="true"></ccd-case-view>
  `
})
export class CaseDetailsComponent implements OnInit{

  constructor() {}

  caseId = '1559225025259926';
  eventTriggerId = ['enterCaseIntoLegacy'];

  ngOnInit(): void {
  }

  cancel($event) {}
  submit($event) {}

}
