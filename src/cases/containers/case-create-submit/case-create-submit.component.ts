import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CaseEventTrigger, CaseEventData, Draft, CaseReferencePipe, CaseEditPageComponent, AlertService,
  CasesService, DraftService } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';
import { EventStatusService } from '@hmcts/ccd-case-ui-toolkit/dist/shared/services';
import * as fromCaseCreate from '../../store';
import {Store} from '@ngrx/store';
import { ActionBindingModel } from 'src/cases/models/create-case-actions.model';
import * as fromCases from '../../../cases/store';

@Component({
  selector: 'exui-case-create-submit',
  templateUrl: 'case-create-submit.component.html'
})
export class CaseCreateSubmitComponent implements OnInit {

  eventTrigger: CaseEventTrigger;

  jurisdictionId: string;
  caseTypeId: string;

  caseCreateSubmitEventsBindings: ActionBindingModel[];
  fromCasesFeature: any;

  constructor(
    private casesService: CasesService,
    private draftService: DraftService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private caseReferencePipe: CaseReferencePipe,
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
  }

  submit(): (sanitizedEditForm: CaseEventData) => any {
    return (sanitizedEditForm: CaseEventData) => {
      sanitizedEditForm.draft_id = this.eventTrigger.case_id;
      return this.casesService.createCase(this.jurisdictionId, this.caseTypeId, sanitizedEditForm);
    };
  }

  validate(): (sanitizedEditForm: CaseEventData, pageId: string) => any {
    return (sanitizedEditForm: CaseEventData, pageId: string) => this.casesService.validateCase(this.caseTypeId,
      sanitizedEditForm, pageId);
  }

  saveDraft(): (caseEventData: CaseEventData) => any {
    if (this.eventTrigger.can_save_draft) {
      return (caseEventData: CaseEventData) => this.draftService.createOrUpdateDraft(this.caseTypeId,
            this.eventTrigger.case_id,
            caseEventData);
    }
  }

  submitted(event: any): void {
    const caseId: string = event.caseId;
    const eventStatus: string = event.status;
    this.router
      .navigate(['case', this.jurisdictionId, this.caseTypeId, caseId])
      .then(() => {
        const caseReference = this.caseReferencePipe.transform(String(caseId));
        if (EventStatusService.isIncomplete(eventStatus)) {
          this.alertFailure(eventStatus, caseReference);
        } else {
          this.alertSuccess(eventStatus, caseReference);
        }
    });
  }

  cancel(event: any): Promise<boolean> {
    if (this.eventTrigger.can_save_draft) {
      switch (event.status) {
        case CaseEditPageComponent.NEW_FORM_DISCARD:
          return this.router.navigate(['list/case']);
        case CaseEditPageComponent.RESUMED_FORM_DISCARD:
          return this.router.navigate([`case/${this.jurisdictionId}/${this.caseTypeId}/${this.eventTrigger.case_id}`]);
        case CaseEditPageComponent.NEW_FORM_SAVE:
          this.saveDraft().call(null, event.data).subscribe(_ => {
            return this.router.navigate(['list/case'])
              .then(() => {
                this.alertService.setPreserveAlerts(true);
                this.alertService.success(`The draft has been successfully saved`);
              });
          }, error => {
            console.log('error=', error);
            this.alertService.setPreserveAlerts(true);
            this.alertService.warning(error.message);
            this.router.navigate(['list/case']);
          });
          break;
        case CaseEditPageComponent.RESUMED_FORM_SAVE:
          this.saveDraft().call(null, event.data).subscribe(_ => {
            return this.router.navigate([`case/${this.jurisdictionId}/${this.caseTypeId}/${this.eventTrigger.case_id}`])
              .then(() => {
                this.alertService.setPreserveAlerts(true);
                this.alertService.success(`The draft has been successfully saved`);
              });
            }, error => {
              console.log('error=', error);
              this.alertService.setPreserveAlerts(true);
              this.alertService.warning(error.message);
          });
          break;
      }
    } else {
      return this.router.navigate(['list/case']);
    }
  }

  private alertSuccess(eventStatus, caseReference) {
    eventStatus = eventStatus || EventStatusService.CALLBACK_STATUS_COMPLETE;
    switch (eventStatus) {
      case EventStatusService.CALLBACK_STATUS_COMPLETE:
        this.alertService.success(`Case #${caseReference} has been created.`);
        break;
      case EventStatusService.DELETE_DRAFT_STATUS_COMPLETE:
        this.alertService.success(`Case #${caseReference} has been created. The draft has been successfully deleted`);
        break;
    }
  }

  private alertFailure(eventStatus, caseReference) {
    switch (eventStatus) {
      case EventStatusService.CALLBACK_STATUS_INCOMPLETE:
        this.alertService.warning(`Case #${caseReference} has been created but the callback service cannot be completed`);
        break;
      case EventStatusService.DELETE_DRAFT_STATUS_INCOMPLETE:
        this.alertService.warning(`Case #${caseReference} has been created. The draft store is currently down so the draft
         was not deleted.`);
        break;
    }
  }
}
