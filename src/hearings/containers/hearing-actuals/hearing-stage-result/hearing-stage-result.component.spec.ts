import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { initialState } from '../../../hearing.test.data';
import { HearingResult } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import { HearingStageResultComponent } from './hearing-stage-result.component';

describe('HearingStageResultComponent', () => {
  let component: HearingStageResultComponent;
  let fixture: ComponentFixture<HearingStageResultComponent>;
  let store: any;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);

  const hearingActualCancelReasonsRefData = [
    { key: 'reasoneOne', value_en: 'Reason 1', value_cy: '', hintText_EN: 'reason 1', hintTextCY: '', order: 1, parentKey: null },
    { key: 'reasoneTwo', value_en: 'Reason 2', value_cy: '', hintText_EN: 'Reason 2', hintTextCY: '', order: 2, parentKey: null },
    { key: 'reasonThree', value_en: 'Reason 3', value_cy: '', hintText_EN: 'Reason 3', hintTextCY: '', order: 4, parentKey: null }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HearingStageResultComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({initialState}),
        {provide: HearingsService, useValue: hearingsService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingStageResultComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe', () => {
    component.sub = new Observable().subscribe();
    spyOn(component.sub, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.sub.unsubscribe).toHaveBeenCalled();
  });

  it('should not display hearing result dropdowns by default', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    expect(nativeElement.querySelector('#adjourned-reason')).toBeNull();
    expect(nativeElement.querySelector('#cancelled-reason')).toBeNull();
  });

  it('should display dropdown when selecting a radio button', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    const firstRadioButtonElement = nativeElement.querySelector('#completed');
    firstRadioButtonElement.click();
    fixture.detectChanges();

    expect(nativeElement.querySelector('#adjourned-reason')).toBeNull();
    expect(nativeElement.querySelector('#cancelled-reason')).toBeNull();

    const secondRadioButtonElement = nativeElement.querySelector('#adjourned');
    secondRadioButtonElement.click();
    fixture.detectChanges();
    expect(nativeElement.querySelector('#adjourned-reason')).toBeDefined();
    expect(nativeElement.querySelector('#cancelled-reason')).toBeNull();

    const thirdRadioButtonElement = nativeElement.querySelector('#cancelled');
    thirdRadioButtonElement.click();
    fixture.detectChanges();
    expect(nativeElement.querySelector('#adjourned-reason')).toBeNull();
    expect(nativeElement.querySelector('#cancelled-reason')).toBeDefined();
  });

  it('should update hearing outcome details on submit', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.hearingResultType = HearingResult.COMPLETED;
    component.onSubmit();
    expect(storeDispatchSpy).toHaveBeenCalled();
  });

  it('should be able to submit if the form is valid', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.cancelHearingActualReasons = hearingActualCancelReasonsRefData;
    component.hearingStageResultForm.get('cancelledReason').setValue('reasoneTwo');
    fixture.detectChanges();
    component.hearingResultType = HearingResult.CANCELLED;
    const nativeElement = fixture.debugElement.nativeElement;
    nativeElement.querySelector('#cancelled').click();
    fixture.detectChanges();
    const cancelledReasonElement: HTMLSelectElement = nativeElement.querySelector('#cancelled-reason');
    cancelledReasonElement.selectedIndex = 2;
    nativeElement.querySelector('.govuk-button').click();
    expect(storeDispatchSpy).toHaveBeenCalled();
  });
});
