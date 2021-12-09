import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorMessage } from '@hmcts/ccd-case-ui-toolkit/dist/shared/domain';
import { provideMockStore } from '@ngrx/store/testing';
import { RefDataModel } from '../../../models/refData.model';
import { HearingStageComponent } from './hearing-stage.component';

@Component({
  selector: 'exui-hearing-parties-title',
  template: '',
})
class MockHearingPartiesComponent {
  @Input() public error: ErrorMessage;
}


fdescribe('HearingStageComponent', () => {
  let component: HearingStageComponent;
  let fixture: ComponentFixture<HearingStageComponent>;

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
            hmctsServiceID: 'TEST'
          }
        ]
      },
        hearingValues:  {
          serviceHearingValuesModel: {
            autoListFlag: false,
            hearingType: 'Final',
            lastError: null,
          },
          lastError: null,
      },
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [ HearingStageComponent, MockHearingPartiesComponent ],
      providers: [
        provideMockStore({initialState}),
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingStageComponent);
    component = fixture.componentInstance;  
    fixture.detectChanges();
  });

  it('should create component and set option collection', () => {
    expect(component).toBeDefined();
    expect(component.hearingStageOptions).toEqual(source);
    expect(component.stageForm.controls['stage-option']).toBeDefined();
  });

  it('should set hearingtype', async (done) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      done();
      expect(component.hearingType).toEqual(initialState.hearings.hearingValues.serviceHearingValuesModel.hearingType);
    });
  });

  it('should initialise control value to hearing type from store', async (done) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      done();
      component.ngAfterViewInit();
      expect(component.stageForm.controls['stage-option'].value).toEqual(initialState.hearings.hearingValues.serviceHearingValuesModel.hearingType);
    });
  });

  it('should be in the same order as service', () => {
    const radioLabels = fixture.debugElement.queryAll(By.css('.govuk-radios__item'));
    expect(radioLabels.length).toBeGreaterThan(0);

    for (let index = 0; index < radioLabels.length; index++) {
      expect(radioLabels[index].nativeElement.innerText).toEqual(source[index].value_en);
    }
  });

  it('should call unsubscribe', (done) => {
    component.ngOnInit();
    spyOn(component.hearingStoreSub, 'unsubscribe');
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      done();
      component.ngOnDestroy();
      expect(component.hearingStoreSub.unsubscribe).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    fixture.destroy();
  });
});
