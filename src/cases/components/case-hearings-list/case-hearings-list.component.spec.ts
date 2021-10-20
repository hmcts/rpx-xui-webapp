import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FeatureUser } from '@hmcts/rpx-xui-common-lib';
import { Observable, of } from 'rxjs';
import { RoleCategoryMappingService } from 'src/app/services/role-category-mapping/role-category-mapping.service';
import { Actions, HearingListingStatusEnum, HearingsSectionStatusEnum } from '../../../hearings/models/hearings.enum';
import { HearingsPipesModule } from '../../../hearings/pipes/hearings.pipes.module';
import { CaseHearingsListComponent } from './case-hearings-list.component';

class MockRoleCategoryMappingService {
  public initialize = (user: FeatureUser, clientId: string): void => { };
  public isEnabled = (feature: string): Observable<boolean> => { return of(true); };
  public getValue = <R>(key: string, defaultValue: R): Observable<R> => of(defaultValue);
  public getValueOnce = <R>(key: string, defaultValue: R): Observable<R>  =>  of(defaultValue);
}

fdescribe('CaseHearingsListComponent', () => {
  let component: CaseHearingsListComponent;
  let roleCategoryMappingService: RoleCategoryMappingService;
  let fixture: ComponentFixture<CaseHearingsListComponent>;
  const mockFeatureService = new MockRoleCategoryMappingService();

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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseHearingsListComponent);
    roleCategoryMappingService = new RoleCategoryMappingService(mockFeatureService);
    component = fixture.componentInstance;
    component.actions = [Actions.Delete];
    component.status = HearingsSectionStatusEnum.PAST_AND_CANCELLED;
    component.hearingsList$ = of( [{
      hearingID: 'h555555',
      hearingType: 'Directions hearing',
      hmcStatus: HearingsSectionStatusEnum.PAST_AND_CANCELLED,
      lastResponseReceivedDateTime: '2021-08-05T16:00:00.000+0000',
      responseVersion: 'rv5',
      hearingListingStatus: HearingListingStatusEnum.CANCELLED,
      hearingsSectionStatus: '',
      hearingDaySchedule: [],
      }, {
        hearingID: 'h555555',
        hearingType: 'Directions hearing',
        hmcStatus: HearingsSectionStatusEnum.UPCOMING,
        lastResponseReceivedDateTime: '2021-08-05T16:00:00.000+0000',
        responseVersion: 'rv5',
        hearingListingStatus: HearingListingStatusEnum.CANCELLED,
        hearingsSectionStatus: '',
        hearingDaySchedule: [],
        }]);
    component.actions = [Actions.Delete];
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


  it('should hasReadOnlyAction if status is past and cancelled', () => {
    component.status = HearingsSectionStatusEnum.PAST_AND_CANCELLED;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hasReadOnlyAction).toBeTruthy();
  });

  it('should hasUpdateAction if status upcoming', () => {
    component.status = HearingsSectionStatusEnum.UPCOMING;
    component.actions = [Actions.Update, Actions.Delete];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hasUpdateAction).toBeTruthy();
  });

  it('should hasUpdateAction if status upcoming', () => {
    component.status = HearingsSectionStatusEnum.UPCOMING;
    component.actions = [Actions.Update, Actions.Delete];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hasDeleteAction).toBeTruthy();
  });

  it('should hasReadOnlyAction if status upcoming', () => {
    component.status = HearingsSectionStatusEnum.UPCOMING;
    component.actions = [Actions.Read];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hasReadOnlyAction).toBeTruthy();
  });
});
