import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseHearingModel } from 'api/hearings/models/caseHearing.model';
import { Observable, of } from 'rxjs';
import { Actions, HearingListingStatusEnum, HearingsSectionStatusEnum } from '../../../hearings/models/hearings.enum';
import { HearingsPipesModule } from '../../../hearings/pipes/hearings.pipes.module';
import { CaseHearingsListComponent } from './case-hearings-list.component';

fdescribe('CaseHearingsListComponent', () => {
  let component: CaseHearingsListComponent;
  let fixture: ComponentFixture<CaseHearingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterTestingModule.withRoutes([
        ]),
        HearingsPipesModule
      ],
      declarations: [ CaseHearingsListComponent ],
      providers: [
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseHearingsListComponent);
    component = fixture.componentInstance;
    component.actions = [Actions.Cancel];
    component.status = HearingsSectionStatusEnum.PAST_AND_CANCELLED;
    component. hearingsList$ = of( [{
      hearingID: 'h555555',
      hearingType: 'Directions hearing',
      hmcStatus: HearingsSectionStatusEnum.PAST_AND_CANCELLED,
      lastResponseReceivedDateTime: '2021-08-05T16:00:00.000+0000',
      responseVersion: 'rv5',
      hearingListingStatus: HearingListingStatusEnum.CANCELLED,
      listAssistCaseStatus: '',
      hearingDaySchedule: [],
      }, {
        hearingID: 'h555555',
        hearingType: 'Directions hearing',
        hmcStatus: HearingsSectionStatusEnum.UPCOMING,
        lastResponseReceivedDateTime: '2021-08-05T16:00:00.000+0000',
        responseVersion: 'rv5',
        hearingListingStatus: HearingListingStatusEnum.CANCELLED,
        listAssistCaseStatus: '',
        hearingDaySchedule: [],
        }]);

        fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show only past and cancelling', () => {
    component.status = HearingsSectionStatusEnum.UPCOMING;
    fixture.detectChanges();

    const heading = fixture.debugElement.query(By.css('.govuk-body-lead'));
    expect(heading.nativeElement.innerHTML).toEqual(HearingsSectionStatusEnum.UPCOMING);
  });


});
