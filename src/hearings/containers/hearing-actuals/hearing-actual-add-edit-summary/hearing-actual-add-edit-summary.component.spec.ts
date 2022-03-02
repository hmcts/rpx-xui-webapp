import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { hearingActualAdjournReasonsRefData, hearingActualCancelReasonsRefData, hearingActualsMainModel, initialState } from '../../../hearing.test.data';
import { ACTION, HearingResult } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import { HearingActualAddEditSummaryComponent } from './hearing-actual-add-edit-summary.component';

describe('HearingActualAddEditSummaryComponent', () => {
  let component: HearingActualAddEditSummaryComponent;
  let fixture: ComponentFixture<HearingActualAddEditSummaryComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingActualAddEditSummaryComponent],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({initialState}),
        {provide: HearingsService, useValue: hearingsService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingActualAddEditSummaryComponent);
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

  it('should check back method', () => {
    spyOn(hearingsService, 'navigateAction');
    component.onBack();
    expect(hearingsService.navigateAction).toHaveBeenCalledWith(ACTION.BACK);
  });

  it('should return attending representative', () => {
    component.hearingActualsMainModel = hearingActualsMainModel;
    const attendingRepresentative = component.getRepresentingAttendee(3);
    expect(attendingRepresentative).toEqual('Mary Jones');
  });

  it('should return empty string for hearing result reason type completed', () => {
    const hearingOutcome = hearingActualsMainModel.hearingActuals.hearingOutcome;
    hearingOutcome.hearingResult = HearingResult.COMPLETED;
    hearingOutcome.hearingResultReasonType = '';
    const description = component.getHearingResultReasonTypeDescription(hearingOutcome);
    expect(description).toEqual('');
  });
  
  it('should return hearing result reason type description for adjourned', () => {
    component.adjournHearingActualReasons = hearingActualAdjournReasonsRefData;
    const hearingOutcome = hearingActualsMainModel.hearingActuals.hearingOutcome;
    hearingOutcome.hearingResult = HearingResult.ADJOURNED;
    hearingOutcome.hearingResultReasonType = 'postponedDueToOtherReasons';
    const description = component.getHearingResultReasonTypeDescription(hearingOutcome);
    expect(description).toEqual('Postponed, due to Other Reasons');
  });

  it('should return hearing result reason type description for cancelled', () => {
    component.cancelHearingActualReasons = hearingActualCancelReasonsRefData;
    const hearingOutcome = hearingActualsMainModel.hearingActuals.hearingOutcome;
    hearingOutcome.hearingResult = HearingResult.CANCELLED;
    hearingOutcome.hearingResultReasonType = 'reasoneTwo';
    const description = component.getHearingResultReasonTypeDescription(hearingOutcome);
    expect(description).toEqual('Reason 2');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
