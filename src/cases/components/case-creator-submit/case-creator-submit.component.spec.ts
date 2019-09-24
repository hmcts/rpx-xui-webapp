import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng2-mock-component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CaseCreatorSubmitComponent } from './case-creator-submit.component';
import createSpyObj = jasmine.createSpyObj;
import { HttpError, Draft, DRAFT_PREFIX, createCaseEventTrigger, CaseEventData, CaseDetails, CaseEventTrigger,
  FormErrorService, CaseReferencePipe, FormValueService, CaseView, AlertService, CaseEditPageComponent, CasesService,
  DraftService, CaseField } from '@hmcts/ccd-case-ui-toolkit';

let CaseEditComponent: any = MockComponent({
  selector: 'ccd-case-edit',
  inputs: ['eventTrigger', 'submit', 'validate', 'saveDraft', 'caseDetails'],
  outputs: ['cancelled', 'submitted']
});

describe('CaseCreatorSubmitComponent with Save and Resume enabled', () => {

  const JID = 'PROBATE';
  const CTID = 'ComplexTestType';
  const PAGE_ID = 'pageId';

  const CREATED_CASE: CaseDetails = {
    id: '1234567890123456',
    jurisdiction: JID,
    case_type_id: CTID,
    state: 'CaseCreated'
  };
  const CREATED_CASE_OBS: Observable<CaseDetails> = Observable.of(CREATED_CASE);

  const ERROR: HttpError = new HttpError();
  ERROR.message = 'Critical error!';

  let fixture: ComponentFixture<CaseCreatorSubmitComponent>;
  let component: CaseCreatorSubmitComponent;

  let EventTriggerHeaderComponent: any = MockComponent({
    selector: 'ccd-event-trigger-header',
    inputs: ['eventTrigger']
  });

  let FieldRead: any = MockComponent({
    selector: 'ccd-field-read',
    inputs: ['caseField']
  });

  let FieldWrite: any = MockComponent({
    selector: 'ccd-field-write',
    inputs: ['caseField', 'formGroup', 'idPrefix', 'isExpanded']
  });

  const RouterLinkComponent: any = MockComponent({
    selector: 'a'
  });

  const CASE_DETAILS: CaseView = new CaseView();
  CASE_DETAILS.case_id = '42';

  const EVENT_TRIGGER: CaseEventTrigger = createCaseEventTrigger(
    'TEST_TRIGGER',
    'Test Trigger',
    null,
    false,
    [
      <CaseField>({
        id: 'PersonFirstName',
        label: 'First name',
        field_type: null,
        display_context: 'READONLY'
      }),
      <CaseField>({
        id: 'PersonLastName',
        label: 'Last name',
        field_type: null,
        display_context: 'OPTIONAL'
      })
    ],
    [],
    true
  );

  const PARAMS: Params = {
    jid: JID,
    ctid: CTID
  };

  const SANITISED_EDIT_FORM: CaseEventData = {
    data: {
      'PersonLastName': 'Khaleesi'
    },
    event: {
      id: null,
      summary: 'Some summary',
      description: 'Some description'
    },
    event_token: 'test-token',
    ignore_warning: false
  };

  let mockRoute: any = {
    snapshot: {
      data: {
        eventTrigger: EVENT_TRIGGER
      },
      params: {
        PARAMS
      }
    },
    params: Observable.of(PARAMS)
  };

  let router: any;
  let alertService: any;
  let casesService: any;
  let draftService: any;
  let formErrorService: any;
  let formValueService: any;
  let casesReferencePipe: any;

  beforeEach(async(() => {
    casesService = createSpyObj<CasesService>('casesService', ['createCase', 'validateCase']);
    casesService.createCase.and.returnValue(Observable.of(CASE_DETAILS));
    draftService = createSpyObj<DraftService>('draftService', ['createOrUpdateDraft']);
    draftService.createOrUpdateDraft.and.returnValue(Observable.of(DRAFT_PREFIX));
    casesReferencePipe = createSpyObj<CaseReferencePipe>('caseReference', ['transform']);

    alertService = createSpyObj<AlertService>('alertService', ['success', 'warning', 'setPreserveAlerts']);

    router = createSpyObj('router', ['navigate']);
    router.navigate.and.returnValue({then: f => f()});
    formErrorService = createSpyObj<FormErrorService>('formErrorService', ['mapFieldErrors']);

    formValueService = createSpyObj<FormValueService>('formValueService', ['sanitise']);

    TestBed
      .configureTestingModule({
        imports: [
          ReactiveFormsModule
        ],
        declarations: [
          CaseEditComponent,
          CaseCreatorSubmitComponent,

          // Mock
          EventTriggerHeaderComponent,
          RouterLinkComponent,
          FieldRead,
          FieldWrite,
          CaseReferencePipe
        ],
        providers: [
          { provide: ActivatedRoute, useValue: mockRoute },
          { provide: CasesService, useValue: casesService },
          { provide: DraftService, useValue: draftService },
          { provide: Router, useValue: router },
          { provide: AlertService, useValue: alertService },
          { provide: FormErrorService, useValue: formErrorService },
          { provide: FormValueService, useValue: formValueService },
          { provide: CaseReferencePipe, useValue: casesReferencePipe }
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(CaseCreatorSubmitComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create case with sanitised data when form submitted', () => {
    casesService.createCase.and.returnValue(CREATED_CASE_OBS);
    component.submit()(SANITISED_EDIT_FORM);

    expect(casesService.createCase).toHaveBeenCalledWith(JID, CTID, SANITISED_EDIT_FORM);
  });

  it('should validate case details with sanitised data when validated', () => {
    casesService.validateCase.and.returnValue(CREATED_CASE_OBS);
    component.validate()(SANITISED_EDIT_FORM, PAGE_ID);

    expect(casesService.validateCase).toHaveBeenCalledWith(CTID, SANITISED_EDIT_FORM, PAGE_ID);
  });

  it('should create a draft when saveDraft called with sanitised data', () => {
    component.eventTrigger.case_id = undefined;
    component.saveDraft()(SANITISED_EDIT_FORM);

    expect(draftService.createOrUpdateDraft).toHaveBeenCalledWith(CTID, undefined, SANITISED_EDIT_FORM);
  });

  it('should update draft when saveDraft called with sanitised data for second time', () => {
    const DRAFT_ID = '12345';
    component.eventTrigger.case_id = DRAFT_PREFIX + DRAFT_ID; // Set behaviour to draft has been saved before
    component.saveDraft()(SANITISED_EDIT_FORM);

    expect(draftService.createOrUpdateDraft).toHaveBeenCalledWith(CTID, DRAFT_PREFIX + DRAFT_ID, SANITISED_EDIT_FORM);
  });

  it('should navigate to case view upon successful case creation', () => {
    casesService.createCase.and.returnValue(CREATED_CASE_OBS);

    component.submitted({caseId: CREATED_CASE.id});

    expect(router.navigate).toHaveBeenCalledWith(['case', CREATED_CASE.jurisdiction, CREATED_CASE.case_type_id, CREATED_CASE.id]);
  });

  it('should alert success message after navigation upon successful case creation', () => {
    casesService.createCase.and.returnValue(CREATED_CASE_OBS);

    component.submitted(CREATED_CASE.id);

    expect(alertService.success).toHaveBeenCalled();
  });

  it('should alert success message after navigation upon successful event creation and call back', () => {
    casesService.createCase.and.returnValue(CREATED_CASE_OBS);

    component.submitted({caseId: 123, status: 'CALLBACK_COMPLETED'});

    expect(alertService.success).toHaveBeenCalled();
  });

  it('should alert warning message after navigation upon successful event creation but incomplete call back', () => {
    casesService.createCase.and.returnValue(CREATED_CASE_OBS);

    component.submitted({caseId: 123, status: 'INCOMPLETE_CALLBACK'});

    expect(alertService.warning).toHaveBeenCalled();
  });

  it('should alert warning message after navigation upon successful event creation but incomplete delete draft', () => {
    casesService.createCase.and.returnValue(CREATED_CASE_OBS);

    component.submitted({caseId: 123, status: 'INCOMPLETE_DELETE_DRAFT'});

    expect(alertService.warning).toHaveBeenCalled();
  });

  it('should have a cancel button going back to the case list for discard new draft', () => {
    component.cancel({status: CaseEditPageComponent.NEW_FORM_DISCARD, data: {field1 : 'value1'}});

    expect(draftService.createOrUpdateDraft).not.toHaveBeenCalledWith(JID, CTID, EVENT_TRIGGER.case_id, SANITISED_EDIT_FORM);
    expect(router.navigate).toHaveBeenCalledWith(['list/case']);
  });

  it('should have a cancel button going back to the view draft for discard existing draft', () => {
    component.cancel({status: CaseEditPageComponent.RESUMED_FORM_DISCARD, data: {field1 : 'value1'}});

    expect(draftService.createOrUpdateDraft).not.toHaveBeenCalledWith(JID, CTID, EVENT_TRIGGER.case_id, SANITISED_EDIT_FORM);
    expect(router.navigate).toHaveBeenCalledWith([`case/${JID}/${CTID}/${EVENT_TRIGGER.case_id}`]);
  });

  it('should have a cancel button saving draft going back to the case list for save new draft', () => {
    component.cancel({status: CaseEditPageComponent.NEW_FORM_SAVE, data : SANITISED_EDIT_FORM});

    expect(draftService.createOrUpdateDraft).toHaveBeenCalledWith(CTID, EVENT_TRIGGER.case_id, SANITISED_EDIT_FORM);
    expect(router.navigate).toHaveBeenCalledWith(['list/case']);
  });

  it('should have a cancel button saving draft and going back to the view draft for save existing draft', () => {
    component.cancel({status: CaseEditPageComponent.RESUMED_FORM_SAVE, data : SANITISED_EDIT_FORM});

    expect(draftService.createOrUpdateDraft).toHaveBeenCalledWith(CTID, EVENT_TRIGGER.case_id, SANITISED_EDIT_FORM);
    expect(router.navigate).toHaveBeenCalledWith([`case/${JID}/${CTID}/${EVENT_TRIGGER.case_id}`]);
  });
});

describe('CaseCreatorSubmitComponent with Save and Resume enabled', () => {

  const JID = 'PROBATE';
  const CTID = 'ComplexTestType';

  const CREATED_CASE: CaseDetails = {
    id: '1234567890123456',
    jurisdiction: JID,
    case_type_id: CTID,
    state: 'CaseCreated'
  };
  const CREATED_CASE_OBS: Observable<CaseDetails> = Observable.of(CREATED_CASE);

  const ERROR: HttpError = new HttpError();
  ERROR.message = 'Critical error!';

  let fixture: ComponentFixture<CaseCreatorSubmitComponent>;
  let component: CaseCreatorSubmitComponent;

  let EventTriggerHeaderComponent: any = MockComponent({
    selector: 'ccd-event-trigger-header',
    inputs: ['eventTrigger']
  });

  let FieldRead: any = MockComponent({
    selector: 'ccd-field-read',
    inputs: ['caseField']
  });

  let FieldWrite: any = MockComponent({
    selector: 'ccd-field-write',
    inputs: ['caseField', 'formGroup', 'idPrefix', 'isExpanded']
  });

  const RouterLinkComponent: any = MockComponent({
    selector: 'a'
  });

  const CASE_DETAILS: CaseView = new CaseView();
  CASE_DETAILS.case_id = '42';

  const EVENT_TRIGGER_SAVE_AND_RESUME_DISABLED: CaseEventTrigger = createCaseEventTrigger(
    'TEST_TRIGGER',
    'Test Trigger',
    null,
    false,
    [
      <CaseField>({
        id: 'PersonFirstName',
        label: 'First name',
        field_type: null,
        display_context: 'READONLY'
      }),
      <CaseField>({
        id: 'PersonLastName',
        label: 'Last name',
        field_type: null,
        display_context: 'OPTIONAL'
      })
    ],
    [],
    false
  );

  const PARAMS: Params = {
    jid: JID,
    ctid: CTID
  };

  const SANITISED_EDIT_FORM: CaseEventData = {
    data: {
      'PersonLastName': 'Khaleesi'
    },
    event: {
      id: null,
      summary: 'Some summary',
      description: 'Some description'
    },
    event_token: 'test-token',
    ignore_warning: false
  };

  let mockRoute: any = {
    snapshot: {
      data: {
        eventTrigger: EVENT_TRIGGER_SAVE_AND_RESUME_DISABLED
      },
      params: {
        PARAMS
      }
    },
    params: Observable.of(PARAMS)
  };

  let router: any;
  let alertService: any;
  let casesService: any;
  let draftService: any;
  let formErrorService: any;
  let formValueService: any;
  let casesReferencePipe: any;

  beforeEach(async(() => {
    casesService = createSpyObj<CasesService>('casesService', ['createCase', 'validateCase']);
    casesService.createCase.and.returnValue(Observable.of(CASE_DETAILS));
    draftService = createSpyObj<DraftService>('draftService', ['createOrUpdateDraft']);
    draftService.createOrUpdateDraft.and.returnValue(Observable.of(DRAFT_PREFIX));
    casesReferencePipe = createSpyObj<CaseReferencePipe>('caseReference', ['transform']);

    alertService = createSpyObj<AlertService>('alertService', ['success', 'warning', 'setPreserveAlerts']);

    router = createSpyObj('router', ['navigate']);
    router.navigate.and.returnValue({then: f => f()});
    formErrorService = createSpyObj<FormErrorService>('formErrorService', ['mapFieldErrors']);

    formValueService = createSpyObj<FormValueService>('formValueService', ['sanitise']);

    TestBed
      .configureTestingModule({
        imports: [
          ReactiveFormsModule
        ],
        declarations: [
          CaseEditComponent,
          CaseCreatorSubmitComponent,

          // Mock
          EventTriggerHeaderComponent,
          RouterLinkComponent,
          FieldRead,
          FieldWrite,
          CaseReferencePipe
        ],
        providers: [
          { provide: ActivatedRoute, useValue: mockRoute },
          { provide: CasesService, useValue: casesService },
          { provide: DraftService, useValue: draftService },
          { provide: Router, useValue: router },
          { provide: AlertService, useValue: alertService },
          { provide: FormErrorService, useValue: formErrorService },
          { provide: FormValueService, useValue: formValueService },
          { provide: CaseReferencePipe, useValue: casesReferencePipe }
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(CaseCreatorSubmitComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should have a cancel button going back to the case list for cancel create case event', () => {
    component.cancel({});

    expect(draftService.createOrUpdateDraft)
      .not.toHaveBeenCalledWith(JID, CTID, EVENT_TRIGGER_SAVE_AND_RESUME_DISABLED.case_id, SANITISED_EDIT_FORM);
    expect(router.navigate).toHaveBeenCalledWith(['list/case']);
  });
});
