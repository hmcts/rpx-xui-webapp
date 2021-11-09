import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FeatureUser } from '@hmcts/rpx-xui-common-lib';
import { Observable, of } from 'rxjs';
import { RoleCategoryMappingService } from 'src/app/services/role-category-mapping/role-category-mapping.service';
import { Actions, EXUIDisplayStatusEnum, EXUISectionStatusEnum, HearingListingStatusEnum } from '../../../hearings/models/hearings.enum';
import { HearingsPipesModule } from '../../../hearings/pipes/hearings.pipes.module';
import { CaseHearingsListComponent } from './case-hearings-list.component';

class MockRoleCategoryMappingService {
  public initialize = (user: FeatureUser, clientId: string): void => {
  };
  public isEnabled = (feature: string): Observable<boolean> => of(true);
  public getValue = <R>(key: string, defaultValue: R): Observable<R> => of(defaultValue);
  public getValueOnce = <R>(key: string, defaultValue: R): Observable<R> => of(defaultValue);
}

describe('CaseHearingsListComponent', () => {
  let component: CaseHearingsListComponent;
  let roleCategoryMappingService: RoleCategoryMappingService;
  let fixture: ComponentFixture<CaseHearingsListComponent>;
  const mockFeatureService = new MockRoleCategoryMappingService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterTestingModule.withRoutes([]),
        HearingsPipesModule
      ],
      declarations: [CaseHearingsListComponent],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseHearingsListComponent);
    roleCategoryMappingService = new RoleCategoryMappingService(mockFeatureService);
    component = fixture.componentInstance;
    component.actions = [Actions.DELETE];
    component.status = EXUISectionStatusEnum.PAST_AND_CANCELLED;
    component.hearingsList$ = of([{
      hearingID: 'h555555',
      hearingType: 'Directions hearing',
      hmcStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
      hearingRequestDateTime: '2021-08-05T16:00:00.000+0000',
      responseVersion: 'rv5',
      hearingListingStatus: HearingListingStatusEnum.CANCELLED,
      listAssistCaseStatus: '',
      exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
      exuiDisplayStatus: EXUIDisplayStatusEnum.CANCELLED,
      hearingDaySchedule: [],
    }, {
      hearingID: 'h555555',
      hearingType: 'Directions hearing',
      hmcStatus: EXUISectionStatusEnum.UPCOMING,
      hearingRequestDateTime: '2021-08-05T16:00:00.000+0000',
      responseVersion: 'rv5',
      hearingListingStatus: HearingListingStatusEnum.CANCELLED,
      listAssistCaseStatus: '',
      exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
      exuiDisplayStatus: EXUIDisplayStatusEnum.CANCELLED,
      hearingDaySchedule: [],
    }]);
    component.actions = [Actions.DELETE];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show only past and cancelling', () => {
    component.status = EXUISectionStatusEnum.UPCOMING;
    fixture.detectChanges();

    const heading = fixture.debugElement.query(By.css('.govuk-body-lead'));
    expect(heading.nativeElement.innerHTML).toEqual(EXUISectionStatusEnum.UPCOMING);
  });

  it('should hasReadOnlyAction if status is past and cancelled', () => {
    component.status = EXUISectionStatusEnum.PAST_AND_CANCELLED;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hasReadOnlyAction).toBeTruthy();
  });

  it('should hasUpdateAction if status upcoming', () => {
    component.status = EXUISectionStatusEnum.UPCOMING;
    component.actions = [Actions.UPDATE, Actions.DELETE];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hasUpdateAction).toBeTruthy();
  });

  it('should hasUpdateAction if status upcoming', () => {
    component.status = EXUISectionStatusEnum.UPCOMING;
    component.actions = [Actions.UPDATE, Actions.DELETE];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hasDeleteAction).toBeTruthy();
  });

  it('should hasReadOnlyAction if status upcoming', () => {
    component.status = EXUISectionStatusEnum.UPCOMING;
    component.actions = [Actions.READ];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hasReadOnlyAction).toBeTruthy();
  });
});
