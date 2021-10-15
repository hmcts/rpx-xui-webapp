import { Component, Input } from "@angular/core";
import { CaseHearingModel } from "api/hearings/models/caseHearing.model";
import { Observable } from "rxjs";
import { Actions } from "src/app/store";

@Component({
    selector: 'exui-case-hearings-list',
    template: ''
  })
  export class CaseHearingsListComponentStub {
    @Input()
    public status: string;
  
    @Input()
    public hearingsList$: Observable<CaseHearingModel[]>;
  
    @Input()
    public actions: Actions[];
  }