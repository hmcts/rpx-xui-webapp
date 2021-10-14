import { Component, Input } from "@angular/core";
import { CaseHearingModel } from "api/hearings/models/caseHearing.model";
import { Observable } from "rxjs";
import { Actions } from "src/app/store";

@Component({
    selector: 'exui2-case-hearings-list',
    template: ''
  })
  export class CaseHearingsListComponentStub {
    @Input()
    public hearingType = '';
  
    @Input()string
    public status: string;
  
    @Input()
    public hearingsList$: Observable<CaseHearingModel[]>;
  
    @Input()
    public actions: Actions[];
  }