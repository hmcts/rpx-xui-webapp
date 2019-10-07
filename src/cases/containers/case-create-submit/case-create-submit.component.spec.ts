import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CaseUIToolkitModule,
  DraftService,
  AuthService as CCDAuthService,
  CasesService,
  HttpErrorService,
  AbstractAppConfig,
  SearchService,
  RequestOptionsBuilder,
  CaseEventTrigger,
  createCaseEventTrigger,
  CaseField,
  CaseEventData,
} from '@hmcts/ccd-case-ui-toolkit';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { RouterTestingModule } from '@angular/router/testing';
import {combineReducers, StoreModule} from '@ngrx/store';
import { SharedModule } from '../../../app/shared/shared.module';
import { AppConfigService } from '../../../app/services/config/configuration.services';
import { CaseCreateSubmitComponent } from './case-create-submit.component';
import * as fromCases from '../../store/reducers';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

class MockSortService {
  features = {};
  getFeatureToggle() { }
  getEditorConfiguration() { }
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

describe('CaseCaseComponent', () => {
  let component: CaseCreateSubmitComponent;
  let fixture: ComponentFixture<CaseCreateSubmitComponent>;
  let casesService: CasesService;
  let draftService: DraftService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CaseUIToolkitModule,
        HttpModule,
        HttpClientTestingModule,
        StoreModule.forRoot({...fromCases.reducers, cases: combineReducers(fromCases.reducers)}),
        SharedModule
      ],
      declarations: [CaseCreateSubmitComponent],
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
        }
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

});
