import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AbstractAppConfig,
  AlertService,
  AuthService as CCDAuthService,
  CaseEventData,
  CaseEventTrigger,
  CaseField,
  CasesService,
  CaseUIToolkitModule,
  createCaseEventTrigger,
  DraftService,
  HttpErrorService,
  RequestOptionsBuilder,
  SearchService,
} from '@hmcts/ccd-case-ui-toolkit';
import { EffectsModule } from '@ngrx/effects';
import {combineReducers, StoreModule} from '@ngrx/store';
import { of } from 'rxjs';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { AppConfigService } from '../../../app/services/config/configuration.services';
import { SharedModule } from '../../../app/shared/shared.module';
import * as fromCases from '../../store/reducers';
import { CaseCreateSubmitComponent } from './case-create-submit.component';

class MockSortService {
  public features = {};
  public getFeatureToggle() { }
  public getEditorConfiguration() { }
}

const EVENT_TRIGGER: CaseEventTrigger = createCaseEventTrigger(
  'TEST_TRIGGER',
  'Test Trigger',
  'caseId',
  false,
  [
    ({
      id: 'PersonFirstName',
      label: 'First name',
      field_type: null,
      display_context: 'READONLY'
    }) as CaseField,
    ({
      id: 'PersonLastName',
      label: 'Last name',
      field_type: null,
      display_context: 'OPTIONAL'
    }) as CaseField
  ],
  [],
  true
);

const SANITISED_EDIT_FORM: CaseEventData = {
  data: {},
  event: {
    id: null,
    summary: 'Some summary',
    description: 'Some description'
  },
  event_token: 'test-token',
  ignore_warning: false
};

describe('CaseCreateSubmitComponent', () => {
  let component: CaseCreateSubmitComponent;
  let fixture: ComponentFixture<CaseCreateSubmitComponent>;
  let casesService: CasesService;
  let draftService: DraftService;
  const mockAlertService = jasmine.createSpyObj('alertService', ['error']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CaseUIToolkitModule,
        HttpModule,
        HttpClientTestingModule,
        StoreModule.forRoot({...fromCases.reducers, cases: combineReducers(fromCases.reducers)}),
        EffectsModule.forRoot([]),
        SharedModule
      ],
      declarations: [CaseCreateSubmitComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue:
          {
            queryParams: of({Origin: 'viewDraft'}),
            snapshot: {
              data: {eventTrigger: EVENT_TRIGGER},
              params: {},
              pathFromRoot: [
                {},
                {
                  data: {
                    profile: {}
                  }
                }
              ]
            },
            params: of({jid: 'jid', ctid: 'ctid'})
          }
        },
        CasesService,
        CCDAuthService,
        DraftService,
        AlertService,
        HttpErrorService,
        AppConfigService,
        AppConfig,
        {
          provide: SearchService,
          useValue: {
            requestOptionsBuilder: RequestOptionsBuilder
          }
        },
        {
          provide: AbstractAppConfig,
          useExisting: AppConfig
        },
        {
          provide: AppConfigService,
          useClass: MockSortService
        },
        {
          provide: AlertService,
          useValue: mockAlertService
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseCreateSubmitComponent);
    component = fixture.componentInstance;
    casesService = fixture.debugElement.injector.get(CasesService);
    draftService = fixture.debugElement.injector.get(DraftService);

    fixture.detectChanges();

  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should have called casesService.createCase on submit', async () => {
    spyOn(casesService, 'createCase').and.callThrough();
    component.submit()(SANITISED_EDIT_FORM);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(casesService.createCase).toHaveBeenCalled();
  });

  it('should have called casesService.validateCase on validate', async () => {
    spyOn(casesService, 'validateCase').and.callThrough();
    component.validate()(SANITISED_EDIT_FORM, '12');
    await fixture.whenStable();
    fixture.detectChanges();
    expect(casesService.validateCase).toHaveBeenCalled();
  });

  it('should have called draftService.createOrUpdateDraft on saveDraft', async () => {
    spyOn(draftService, 'createOrUpdateDraft').and.callThrough();
    component.saveDraft()(SANITISED_EDIT_FORM);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(draftService.createOrUpdateDraft).toHaveBeenCalled();
  });

  it('should not  have called draftService.createOrUpdateDraft on saveDraft is false', async () => {
    spyOn(draftService, 'createOrUpdateDraft').and.callThrough();
    component.eventTrigger.can_save_draft = false;
    expect(component.saveDraft()).toBeUndefined();
  });

});
