import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CaseEventData, CaseEventTrigger, CasesService, Draft, DraftService } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActionBindingModel } from '../../../cases/models/create-case-actions.model';
import * as fromCases from '../../../cases/store';
import * as fromCaseCreate from '../../store';

@Component({
  standalone: false,
  selector: 'exui-case-create-submit',
  templateUrl: 'case-create-submit.component.html'
})
export class CaseCreateSubmitComponent implements OnInit {
  public eventTrigger: CaseEventTrigger = new CaseEventTrigger();

  public jurisdictionId: string;
  public caseTypeId: string;

  public caseCreateSubmitEventsBindings: ActionBindingModel[];
  public fromCasesFeature: any;

  constructor(
    private readonly casesService: CasesService,
    private readonly draftService: DraftService,
    private readonly route: ActivatedRoute,
    private readonly store: Store<fromCaseCreate.State>
  ) {
    this.eventTrigger = route.snapshot.data.eventTrigger;
  }

  public ngOnInit() {
    this.fromCasesFeature = fromCases;
    this.route.params.subscribe((params: Params) => {
      this.jurisdictionId = params.jid;
      this.caseTypeId = params.ctid;
    });

    /**
     * Mapping CCD components eventsBindings to ExUI Actions
     */
    this.caseCreateSubmitEventsBindings = [
      { type: 'cancelled', action: 'CreateCaseReset' },
      { type: 'submitted', action: 'ApplyChange' }
    ];
  }

  public submit(): (sanitizedEditForm: CaseEventData) => Observable<object> {
    return (sanitizedEditForm: CaseEventData) => {
      sanitizedEditForm.draft_id = this.eventTrigger.case_id;
      return this.casesService.createCase(this.caseTypeId, sanitizedEditForm) as any;
    };
  }

  public validate(): (sanitizedEditForm: CaseEventData, pageId: string) => Observable<object> {
    return (sanitizedEditForm: CaseEventData, pageId: string) => this.casesService.validateCase(this.caseTypeId,
      sanitizedEditForm, pageId) as any;
  }

  public saveDraft(): (caseEventData: CaseEventData) => Observable<Draft> {
    if (this.eventTrigger.can_save_draft) {
      return (caseEventData: CaseEventData) => this.draftService.createOrUpdateDraft(this.caseTypeId,
        this.eventTrigger.case_id,
        caseEventData) as any;
    }
  }
}
