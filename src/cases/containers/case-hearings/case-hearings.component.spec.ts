
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, Params } from '@angular/router';
import { CaseHearingsComponent } from './case-hearings.component';
import { HearingListingStatusEnum, HearingsSectionStatusEnum } from 'src/hearings/models/hearings.enum';
import { Observable, of } from 'rxjs';

import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { State } from 'src/app/store';
import { UserRole } from '../../../app/models/user-details.model';
import { RoleCategoryMappingService } from '../../../app/services/role-category-mapping/role-category-mapping.service';
import { SessionStorageService } from 'src/app/services';

export class ActivatedRouteMock {
  public paramMap = Observable.of(convertToParamMap({
      cid: '1234567890123456'
  }));
}

describe('CaseHearingsComponent', () => {
  let component: CaseHearingsComponent;
  let fixture: ComponentFixture<CaseHearingsComponent>;
  let de: DebugElement;
  let mockStore: any;
  let hearingStore: any;
  let mockRoleCategoryMappingService: RoleCategoryMappingService;
  let sessionStorageService: SessionStorageService;
  
  const initialState = {
    caseHearingsMainModel: {
        hmctsServiceID: undefined,
        caseRef: undefined,
        caseHearings: [{
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
      }]
    }
  };

  beforeEach(() => {
    sessionStorageService = createSpyObj<SessionStorageService>('httpService', ['getItem']);
    const mockActivatedRoute = new ActivatedRouteMock();
      mockStore = jasmine.createSpyObj('Store', ['dispatch', 'pipe']);
      hearingStore = jasmine.createSpyObj('Store', ['dispatch', 'pipe']);
      mockStore.pipe.and.returnValue(of(initialState));
      const activate = mockActivatedRoute as ActivatedRoute;
      activate.snapshot = {
        params : {
          cid : '1234567890123456'
        } as Params
      } as ActivatedRouteSnapshot;
      component = new CaseHearingsComponent(mockStore, hearingStore, activate, sessionStorageService,);
      component.ngOnInit();

    // mockRoleCategoryMappingService = jasmine.createSpyObj('RoleCategoryMappingService', ['isJudicialOrLegalOpsCategory']);
    // TestBed.configureTestingModule({
    //   declarations: [CaseHearingsComponent],
    //   imports: [RouterTestingModule],
    //   schemas: [CUSTOM_ELEMENTS_SCHEMA],
    //   providers: [
    //     provideMockStore({initialState}),
    //     {
    //       provide: ActivatedRoute,
    //       useValue: {
    //         snapshot: {
    //           params: {
    //             cid: '1234'
    //           },
    //         }
    //       }
    //     },
    //     {
    //       provide: RoleCategoryMappingService,
    //       useValue: mockRoleCategoryMappingService,
    //     }
    //   ]
    // }).compileComponents();
    // fixture = TestBed.createComponent(CaseHearingsComponent);
    // component = fixture.componentInstance;
    // de = fixture.debugElement;
    // // @ts-ignore
    // mockRoleCategoryMappingService.isJudicialOrLegalOpsCategory.and.returnValue(of(UserRole.Judicial));
    // fixture.detectChanges();
    // fixture.debugElement.queryAll(By.css('.govuk-table__cell'))[1];

  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should list hearings with status off past and cancelled', async (done) => {
    component.pastAndCancelledHearings$.subscribe(result => {
        expect(result[0].hmcStatus).toEqual(HearingsSectionStatusEnum.PAST_AND_CANCELLED);
      done();
    });
  });

  it('should list hearings with status off upcoming', async (done) => {
    component.upcomingHearings$.subscribe(result => {
      console.log(result);
        expect(result[0].hmcStatus).toEqual(HearingsSectionStatusEnum.UPCOMING);
      done();
    });
  });
});
function createSpyObj<T>(arg0: string, arg1: string[]): SessionStorageService {
  throw new Error('Function not implemented.');
}

