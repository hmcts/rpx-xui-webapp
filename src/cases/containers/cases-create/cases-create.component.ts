import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/logger/logger.service';
/**
 * Entry component wrapper for CCD-CASE-CREATE
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'app-create-case',
  template: ` 
    <p>create-case container</p>
 <ccd-case-create
     [jurisdiction]="jurisdictionId"
     [caseType]="caseTypeId"
     [event]="eventTriggerId"
     (cancelled)="cancel($event)"
     (submitted)="submit($event)">
    </ccd-case-create>
    `

})
export class CasesCreateComponent {
  // TODO move this to store or better place
  jurisdictionId = 'TEST';
  caseTypeId = 'TestAddressBookCase';
  eventTriggerId = 'createCase';
  caseType: object = {
    jurisdictionId: 'TEST',
    caseTypeId: 'TestAddressBookCase',
    eventTriggerId: 'createCase'
  };

  caseSelected: string;

  constructor(private logger: LoggerService) { }

  // todo add dispatch action ngrx-it
  submit(event: any): void {
    this.logger.info('CaseCreateConsumerComponent submit event=', event);

  }

  cancel(event: any): void {
    this.logger.info('CaseCreateConsumerComponent cancel event=', event);

  }

  chooseEvent() {
    this.caseType = JSON.parse(this.caseSelected);
    this.logger.info(this.caseType);
  }

}
