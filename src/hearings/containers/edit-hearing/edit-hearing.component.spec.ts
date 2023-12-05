import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MockRpxTranslatePipe } from '../../../app/shared/test/mock-rpx-translate.pipe';
import { caseFlagsRefData, initialState } from '../../hearing.test.data';
import { EditHearingChangeConfig } from '../../models/editHearingChangeConfig.model';
import { HearingConditions } from '../../models/hearingConditions';
import { Mode } from '../../models/hearings.enum';
import { LocationByEPIMMSModel } from '../../models/location.model';
import { LocationsDataService } from '../../services/locations-data.service';
import * as fromHearingStore from '../../store';
import { EditHearingComponent } from './edit-hearing.component';

describe('EditHearingComponent', () => {
  let component: EditHearingComponent;
  let fixture: ComponentFixture<EditHearingComponent>;
  let store: any;
  const routeMock = {
    snapshot: {
      data: {
        caseFlags: caseFlagsRefData
      }
    },
    fragment: of('point-to-me')
  };
  const routerMock = jasmine.createSpyObj('Router', [
    'navigateByUrl'
  ]);
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const locationsDataService = new LocationsDataService(mockedHttpClient);

  const locations: LocationByEPIMMSModel[] = [{
    epimms_id: '196538',
    site_name: 'Liverpool Social Security and Child Support Tribunal',
    court_name: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
    open_for_public: 'YES',
    region_id: '5',
    region: 'North West',
    cluster_id: '3',
    cluster_name: 'Cheshire and Merseyside',
    court_status: 'Open',
    court_open_date: null,
    closed_date: null,
    postcode: 'L2 5UZ',
    court_address: 'PRUDENTIAL BUILDING, 36 DALE STREET, LIVERPOOL',
    phone_number: '',
    court_location_code: '',
    dx_address: '',
    welsh_site_name: '',
    welsh_court_address: '',
    venue_name: 'Liverpool',
    is_case_management_location: 'Y',
    is_hearing_location: 'Y'
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        EditHearingComponent,
        MockRpxTranslatePipe
      ],
      providers: [
        provideMockStore({ initialState }),
        LoadingService,
        {
          provide: LocationsDataService,
          useValue: locationsDataService
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: ActivatedRoute,
          useValue: routeMock
        }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(EditHearingComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    spyOn(locationsDataService, 'getLocationById').and.returnValue(of(locations));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe', () => {
    component.hearingStateSub = of().subscribe();
    spyOn(component.hearingStateSub, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.hearingStateSub.unsubscribe).toHaveBeenCalled();
  });

  it('should focus on the element', () => {
    spyOn(component, 'fragmentFocus');
    component.ngAfterViewInit();
    expect(component.fragmentFocus).toHaveBeenCalled();
  });

  it('should save hearing condition and navigate to change link', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    const hearingCondition: HearingConditions = {
      fragmentId: 'point-to-me',
      mode: Mode.VIEW_EDIT
    };
    const editHearingChangeConfig: EditHearingChangeConfig = {
      fragmentId: 'point-to-me',
      changeLink: 'hearing/request/venue'
    };
    component.onChange(editHearingChangeConfig);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.SaveHearingConditions(hearingCondition));
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('hearing/request/venue');
  });
});
