import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorMessage } from '@hmcts/ccd-case-ui-toolkit/dist/shared/domain';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { HearingRequestMainModel } from 'src/hearings/models/hearingRequestMain.model';
import { ACTION, HearingStageEnum } from '../../../models/hearings.enum';
import { RefDataModel } from '../../../models/refData.model';
import { HearingsService } from '../../../services/hearings.service';
import { HearingStageComponent } from './hearing-stage.component';

@Component({
  selector: 'exui-hearing-parties-title',
  template: '',
})
class MockHearingPartiesComponent {
  @Input() public error: ErrorMessage;
}

describe('HearingStageComponent', () => {
  let component: HearingStageComponent;
  let fixture: ComponentFixture<HearingStageComponent>;

  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  const source: RefDataModel[] = [
    {
      key: 'initial',
      value_en: 'Initial',
      value_cy: '',
      hintText_EN: 'Initial',
      hintTextCY: '',
      order: 1,
      parentKey: null,
    },
    {
      key: 'final',
      value_en: 'Final',
      value_cy: '',
      hintText_EN: 'Final',
      hintTextCY: '',
      order: 2,
      parentKey: null,
    },
    {
      key: 'substantial',
      value_en: 'Substantial',
      value_cy: '',
      hintText_EN: 'Substantial',
      hintTextCY: '',
      order: 3,
      parentKey: null,
    },
    {
      key: 'case-management',
      value_en: 'Case management',
      value_cy: '',
      hintText_EN: 'Case management',
      hintTextCY: '',
      order: 4,
      parentKey: null,
    },
  ];

  const initialState = {
    hearings: {
      hearingList: {
        caseHearingMainModel: [
          {
            hmctsServiceID: 'SSCS'
          }
        ]
      },
      hearingValues: {
        serviceHearingValuesModel: {
          autoListFlag: false,
          hearingType: 'Final',
          lastError: null,
        },
        lastError: null,
      },
      hearingRequest: null,
      hearingConditions: null,
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [HearingStageComponent, MockHearingPartiesComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingStages: source
              }
            },
          }
        },
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();

    fixture = TestBed.createComponent(HearingStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and set option collection', () => {
    expect(component).toBeDefined();
    expect(component.hearingStageOptions).toEqual(source);
    expect(component.stageForm.controls['stage-option']).toBeDefined();
  });

  it('should set hearingtype', () => {
    fixture.detectChanges();
    expect(component.hearingType).toEqual(initialState.hearings.hearingValues.serviceHearingValuesModel.hearingType);
  });

  it('should initialise control value to hearing type from store', () => {
    fixture.detectChanges();
    component.ngAfterContentInit();
    expect(component.stageForm.controls['stage-option'].value).toEqual(initialState.hearings.hearingValues.serviceHearingValuesModel.hearingType);
  });

  it('should call unsubscribe', () => {
    component.ngOnInit();
    spyOn(component.hearingStoreSub, 'unsubscribe');
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(component.hearingStoreSub.unsubscribe).toHaveBeenCalled();
  });

  it('should be in the same order as service', () => {
    const radioLabels = fixture.debugElement.queryAll(By.css('.govuk-radios__item'));
    expect(radioLabels.length).toBeGreaterThan(0);

    for (let index = 0; index < radioLabels.length; index++) {
      expect(radioLabels[index].nativeElement.innerText).toEqual(source[index].value_en);
    }
  });

  it('should check form data', () => {
    component.checkFormData();
    expect(component.hearingStageSelectionError).toBe(null);
    component.stageForm.controls['stage-option'].setValue('');
    component.checkFormData();
    expect(component.hearingStageSelectionError).toBe(HearingStageEnum.SelectHearingStageError);
  });

  it('should check form valid', () => {
    component.stageForm.controls['stage-option'].setValue('Final');
    expect(component.isFormValid()).toBe(true);
  });

  it('should execute Action', () => {
    (component as any).hearingRequestMainModel = {} as HearingRequestMainModel;
    component.stageForm.controls['stage-option'].setValue('');
    component.executeAction(ACTION.CONTINUE);
    expect(component.hearingStageSelectionError).toBe(HearingStageEnum.SelectHearingStageError);
    component.stageForm.controls['stage-option'].setValue('Final');
    component.executeAction(ACTION.CONTINUE);
    expect(component.hearingStageSelectionError).toBe(null);
    component.executeAction(ACTION.BACK);
    expect(component.hearingStageSelectionError).toBe(null);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
