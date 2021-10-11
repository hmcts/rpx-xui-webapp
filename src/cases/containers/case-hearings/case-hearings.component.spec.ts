import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CaseHearingsComponent } from './case-hearings.component';

describe('CaseHearingsComponent', () => {
  let component: CaseHearingsComponent;
  let fixture: ComponentFixture<CaseHearingsComponent>;
  let de: DebugElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseHearingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseHearingsComponent);
    component = fixture.componentInstance;
    const mockHearing = [];
    mockHearing.push({ 
      hmctsServiceID: '1',
      caseRef : 'Upcoming',
      caseHearings: [{
        hearingID: '1',
        hearingType: 'Final hearing',
        hmcStatus: 'LISTED',
        lastResponseReceivedDateTime: '12TH October 2021',
        responseVersion: 'string',
        hearingListingStatus: 'COMPLETED',
        listAssistCaseStatus: 'COMPLETED',
        hearingDaySchedule: []
      }]
    });
    component.caseHearing = mockHearing;
    de = fixture.debugElement;
    fixture.detectChanges();
    fixture.debugElement.queryAll(By.css('.govuk-table__cell'))[1];
  });

  it('should create hearing component', () => {
    expect(component).toBeTruthy();
  });

  it('Should have the correct value for status in the markup', () => {
    const secondColumn = fixture.debugElement.queryAll(By.css('.govuk-table__cell strong'))[0];
    expect(secondColumn.nativeElement.innerHTML).toEqual('COMPLETED');
    expect(secondColumn.nativeElement.className).toEqual('TORQUISE');
  });

  it('Should have the requested hearing when request button is clicked', () => {
    spyOn(component.requestHearing, 'emit');

    const requestHearingButton = fixture.debugElement.queryAll(By.css('.govuk-button--start'))[0];
    requestHearingButton.triggerEventHandler('click', null);
    expect(requestHearingButton).toBeTruthy();
    expect(component.requestHearing.emit).toHaveBeenCalled();;
  });

  it('Should have the requested to view hearing when view link is clicked', () => {
    spyOn(component.viewHearing, 'emit');

    const viewHearingButton = fixture.debugElement.queryAll(By.css('.govuk-table__cell a'))[0];
    viewHearingButton.triggerEventHandler('click', null);
    expect(viewHearingButton).toBeTruthy();
    expect(component.viewHearing.emit).toHaveBeenCalled();
  });

  it('Should have the requested to cancel hearing when cancel link is clicked', () => {
    spyOn(component.cancelHearing, 'emit');

    const cancelHearingButton = fixture.debugElement.queryAll(By.css('.govuk-table__cell a'))[1];
    cancelHearingButton.triggerEventHandler('click', null);
    expect(cancelHearingButton).toBeTruthy();
    expect(component.cancelHearing.emit).toHaveBeenCalled();
  });
});
