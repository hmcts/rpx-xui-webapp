import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Router, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {FeatureUser} from '@hmcts/rpx-xui-common-lib';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {RoleCategoryMappingService} from 'src/app/services/role-category-mapping/role-category-mapping.service';
import {
  Actions,
  EXUIDisplayStatusEnum,
  EXUISectionStatusEnum,
  HearingListingStatusEnum
} from '../../../hearings/models/hearings.enum';
import {HearingsPipesModule} from '../../../hearings/pipes/hearings.pipes.module';
import * as fromHearingStore from '../../../hearings/store';
import {CaseHearingsListComponent} from './case-hearings-list.component';

class MockRoleCategoryMappingService {
  public initialize = (user: FeatureUser, clientId: string): void => {
  }
  public isEnabled = (feature: string): Observable<boolean> => of(true);
  public getValue = <R>(key: string, defaultValue: R): Observable<R> => of(defaultValue);
  public getValueOnce = <R>(key: string, defaultValue: R): Observable<R> => of(defaultValue);
}

describe('CaseHearingsListComponent', () => {
  let component: CaseHearingsListComponent;
  let roleCategoryMappingService: RoleCategoryMappingService;
  let fixture: ComponentFixture<CaseHearingsListComponent>;
  const mockFeatureService = new MockRoleCategoryMappingService();
  const mockStore = jasmine.createSpyObj('Store', ['dispatch']);
  let router: any;
  const HEARINGS = [{
    hearingID: 'h555555',
    hearingType: 'Directions hearing',
    hmcStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
    hearingRequestDateTime: '2021-08-05T16:00:00.000+0000',
    lastResponseReceivedDateTime: '',
    responseVersion: 'rv5',
    earliestHearingStartDateTime: '',
    hearingListingStatus: HearingListingStatusEnum.CANCELLED,
    listAssistCaseStatus: '',
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.CANCELLED,
    hearingDaySchedule: [],
  }, {
    hearingID: 'h555555',
    lastResponseReceivedDateTime: '',
    hearingType: 'Directions hearing',
    hearingRequestDateTime: '2021-08-05T16:00:00.000+0000',
    hmcStatus: EXUISectionStatusEnum.UPCOMING,
    responseVersion: 'rv5',
    earliestHearingStartDateTime: '',
    hearingListingStatus: HearingListingStatusEnum.CANCELLED,
    listAssistCaseStatus: '',
    exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
    exuiDisplayStatus: EXUIDisplayStatusEnum.CANCELLED,
    hearingDaySchedule: [],
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterTestingModule.withRoutes([]),
        HearingsPipesModule
      ],
      declarations: [CaseHearingsListComponent],
      providers: [{
        provide: Store,
        useValue: mockStore
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseHearingsListComponent);
    roleCategoryMappingService = new RoleCategoryMappingService(mockFeatureService);
    component = fixture.componentInstance;
    component.actions = [Actions.DELETE];
    component.status = EXUISectionStatusEnum.PAST_AND_CANCELLED;
    component.hearingList$ = of(HEARINGS);
    component.actions = [Actions.DELETE];
    router = TestBed.get(Router);
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

  it('should viewAndEdit', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.viewAndEdit(HEARINGS[0]);
    fixture.detectChanges();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromHearingStore.SaveHearingConditions({mode: 'view'}));
    expect(navigateSpy).toHaveBeenCalledWith(['/', 'hearings', 'request', 'h555555', 'hearing-view-edit-summary']);
  });
});
