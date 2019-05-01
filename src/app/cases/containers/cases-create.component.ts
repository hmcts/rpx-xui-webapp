import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/logger/logger.service';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.css']
})
export class CreateCaseComponent implements OnInit {

  caseSelected: string
  constructor(private logger: LoggerService) {
  }

  ngOnInit() { }

  jurisdictionId = 'TEST';
  caseTypeId = 'TestAddressBookCase';
  eventTriggerId = 'createCase';

  caseType: object = {
    jurisdictionId: "TEST",
    caseTypeId: "TestAddressBookCase",
    eventTriggerId: "createCase"
  }

  submit(event: any): void {
    this.logger.info('CaseCreateConsumerComponent submit event=', event);

  }

  cancel(event: any): void {
    this.logger.info('CaseCreateConsumerComponent cancel event=', event);

  }

  chooseEvent() {
    this.caseType = JSON.parse(this.caseSelected)
    this.logger.info(this.caseType)
  }

}
