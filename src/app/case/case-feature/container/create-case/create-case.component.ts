import { Component, OnInit } from '@angular/core';

//import { LoggerService } from '../../../../logger/logger.service'

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.css']
})
export class CreateCaseComponent implements OnInit {

  caseSelected: string
  constructor(
    //private logger: LoggerService
  ) {
  }

  ngOnInit() {

    //this.logger.info('CreateCaseComponent: initialized');
  }


  jurisdictionId = 'TEST';
  caseTypeId = 'TestAddressBookCase';
  eventTriggerId = 'createCase';


  caseType: object = {
    jurisdictionId: "TEST",
    caseTypeId: "TestAddressBookCase",
    eventTriggerId: "createCase"
  }

  submit(event: any): void {
    console.log('CaseCreateConsumerComponent submit event=', event)

  }

  cancel(event: any): void {
    console.log('CaseCreateConsumerComponent cancel event=', event)
  }



  chooseEvent() {
    this.caseType = JSON.parse(this.caseSelected)
    console.log(this.caseType)
  }

}
