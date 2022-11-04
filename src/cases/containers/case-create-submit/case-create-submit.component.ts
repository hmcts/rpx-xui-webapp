import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CaseEventTrigger, CaseEventData, CasesService, DraftService, Draft } from '@hmcts/ccd-case-ui-toolkit';
import * as fromCaseCreate from '../../store';
import {Store} from '@ngrx/store';
import { ActionBindingModel } from '../../../cases/models/create-case-actions.model';
import * as fromCases from '../../../cases/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'exui-case-create-submit',
  templateUrl: 'case-create-submit.component.html'
})
export class CaseCreateSubmitComponent implements OnInit {

  eventTrigger: CaseEventTrigger = new CaseEventTrigger();

  jurisdictionId: string;
  caseTypeId: string;

  caseCreateSubmitEventsBindings: ActionBindingModel[];
  fromCasesFeature: any;

  constructor(
    private casesService: CasesService,
    private draftService: DraftService,
    private route: ActivatedRoute,
    private store: Store<fromCaseCreate.State>
  ) {
    this.eventTrigger = route.snapshot.data.eventTrigger;
  }

  ngOnInit() {
    this.fromCasesFeature = fromCases;
    this.route.params.subscribe((params: Params) => {
      this.jurisdictionId = params.jid;
      this.caseTypeId = params.ctid;
    });

    /**
     * Mapping CCD components eventsBindings to ExUI Actions
     */
    this.caseCreateSubmitEventsBindings = [
      {type: 'cancelled', action: 'CreateCaseReset'},
      {type: 'submitted', action: 'ApplyChange'}
    ];
  }

  submit(): (sanitizedEditForm: CaseEventData) => Observable<object> {
    return (sanitizedEditForm: CaseEventData) => {
      sanitizedEditForm.draft_id = this.eventTrigger.case_id;
      return this.casesService.createCase(this.caseTypeId, sanitizedEditForm) as any;
    };
  }

  validate(): (sanitizedEditForm: CaseEventData, pageId: string) => Observable<object> {
    return (sanitizedEditForm: CaseEventData, pageId: string) => this.casesService.validateCase(this.caseTypeId,
      sanitizedEditForm, pageId) as any;
  }

  saveDraft(): (caseEventData: CaseEventData) => Observable<Draft> {
    if (this.eventTrigger.can_save_draft) {
      return (caseEventData: CaseEventData) => this.draftService.createOrUpdateDraft(this.caseTypeId,
            this.eventTrigger.case_id,
            caseEventData) as any;
    }
  }

}
