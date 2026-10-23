import { CdkTableModule } from '@angular/cdk/table';
import { Location as AngularLocation } from '@angular/common';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionStorageService } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule, FeatureToggleService, FilterService, RoleCategory } from '@hmcts/rpx-xui-common-lib';
import { Store, StoreModule } from '@ngrx/store';
import { of, OperatorFunction, Subject, throwError } from 'rxjs';
import * as fromAppStore from '../../../app/store';
import { InfoMessage } from '../../../app/shared/enums/info-message';
import { InfoMessageType } from '../../../app/shared/enums/info-message-type';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { LocationDataService, WASupportedJurisdictionsService, WorkAllocationTaskService } from '../../services';
import { TaskTypesService } from '../../services/task-types.service';
import { MyWorkFilterComponent } from './my-work-filter.component';
import { servicesMap } from '../../utils';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  standalone: false,
  template: ` <exui-my-work-filter></exui-my-work-filter>`,
})
class WrapperComponent {
  @ViewChild(MyWorkFilterComponent, { static: true }) public appComponentRef: MyWorkFilterComponent;
}

describe('MyWorkFilterComponent', () => {
  let component: MyWorkFilterComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  const typesOfWork = [
    {
      key: 'hearing_work',
      label: 'Hearing work',
    },
    {
      key: 'upper_tribunal',
      label: 'Upper Tribunal',
    },
    {
      key: 'routine_work',
      label: 'Routine work',
    },
    {
      key: 'decision_making_work',
      label: 'Decision-making work',
    },
    {
      key: 'applications',
      label: 'Applications',
    },
    {
      key: 'priority',
      label: 'Priority',
    },
    {
      key: 'access_requests',
      label: 'Access requests',
    },
    {
      key: 'error_management',
      label: 'Error management',
    },
  ];
  const LOCATION = {
    court_venue_id: '100',
    epimms_id: '219164',
    is_hearing_location: 'Y',
    is_case_management_location: 'Y',
    site_name: 'Aberdeen Tribunal Hearing Centre',
    court_name: 'ABERDEEN TRIBUNAL HEARING CENTRE',
    court_status: 'Open',
    region_id: '9',
    region: 'Scotland',
    court_type_id: '17',
    court_type: 'Employment Tribunal',
    open_for_public: 'Yes',
    court_address: 'AB1, 48 HUNTLY STREET, ABERDEEN test1',
    postcode: 'AB11 6LT',
  };
  const mockStore = jasmine.createSpyObj('mockStore', ['pipe']);
  const mockTaskService = jasmine.createSpyObj('mockTaskService', ['searchTask', 'getUsersAssignedTasks']);
  mockTaskService.currentTasks$ = of([null]);
  const locationService = jasmine.createSpyObj('locationService', ['path', 'getSpecificLocations']);
  const mockWASupportedJurisdictionService = jasmine.createSpyObj('mockWASupportedJurisdictionService', [
    'getWASupportedJurisdictions',
  ]);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem', 'setItem', 'removeItem']);
  mockWASupportedJurisdictionService.getWASupportedJurisdictions.and.returnValue(of(['IA', 'SSCS']));
  const mockFeatureToggleService = jasmine.createSpyObj('featureToggleService', ['getValue']);
  mockTaskService.getUsersAssignedTasks.and.returnValue(of([]));
  locationService.getSpecificLocations.and.returnValue(of([]));
  mockStore.pipe.and.returnValue(of({ roleAssignmentInfo: [{ jurisdiction: 'IA', roleType: 'ORGANISATION' }] }));
  const roleAssignmentInfo = [
    {
      id: '478c83f8-0ed0-4651-b8bf-cd2b1e206ac2',
      actorIdType: 'IDAM',
      actorId: 'c5a983be-ca99-4b8a-97f7-23be33c3fd22',
      roleType: 'CASE',
      roleName: 'SOME_ROLE',
      classification: 'PUBLIC',
      grantType: 'STANDARD',
      roleCategory: 'LEGAL_OPERATIONS',
      readOnly: false,
      created: new Date(2021, 9, 8),
      attributes: {
        primaryLocation: '231596',
        jurisdiction: 'IA',
      },
    },
  ];
  const filterSettings = {
    id: 'locations',
    fields: [
      {
        id: 'services',
        value: ['services_all', 'IA', 'SSCS'],
      },
      {
        name: 'locations',
        value: [LOCATION],
      },
      {
        name: 'types-of-work',
        value: ['types_of_work_all', ...typesOfWork.map((t) => t.key)],
      },
    ],
  };
  const mockFilterService: any = {
    getStream: () => of(filterSettings),
    get: jasmine.createSpy(),
    persist: jasmine.createSpy(),
    givenErrors: {
      subscribe: jasmine.createSpy(),
      next: () => null,
      unsubscribe: () => null,
    },
  };
  let mockRouter: any;
  let storeMock: jasmine.SpyObj<Store<fromAppStore.State>>;

  beforeEach(() => {
    storeMock = jasmine.createSpyObj<Store<fromAppStore.State>>('store', ['pipe']);
    storeMock.pipe.and.returnValue(of(roleAssignmentInfo));
    TestBed.configureTestingModule({
      declarations: [MyWorkFilterComponent, WrapperComponent],
      imports: [CdkTableModule, ExuiCommonLibModule, RouterTestingModule, ExuiCommonLibModule, StoreModule],
      providers: [
        { provide: Store, useValue: mockStore },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                location: LOCATION,
              },
            },
          },
        },
        { provide: AngularLocation, useValue: locationService },
        { provide: WorkAllocationTaskService, useValue: mockTaskService },
        { provide: LocationDataService, useValue: locationService },
        { provide: TaskTypesService, useValue: { getTypesOfWork: () => of(typesOfWork) } },
        { provide: FilterService, useValue: mockFilterService },
        { provide: WASupportedJurisdictionsService, useValue: mockWASupportedJurisdictionService },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        { provide: FeatureToggleService, useValue: mockFeatureToggleService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    component.persistence = 'session';
    mockFilterService.get.and.returnValue(null);
    mockFeatureToggleService.getValue.and.returnValue(of(servicesMap));
    mockSessionStorageService.getItem.and.returnValue(
      JSON.stringify([
        { regionId: '1', locations: ['219164'] },
        { regionId: '9', locations: ['123456'] },
      ])
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show the toggle filter button', () => {
    const button: DebugElement = fixture.debugElement.query(By.css('.govuk-button.hmcts-button--secondary'));
    expect(button.nativeElement.innerText).toContain('Show work filter');
  });

  it('should set the persistence to session storage for a judicial user', () => {
    expect(component.fieldsConfig.persistence).toBe('session');
  });

  it('should set booking locations', () => {
    mockRouter = TestBed.inject(Router);
    spyOn(mockRouter, 'getCurrentNavigation').and.returnValue({ extras: { state: { location: { ids: ['231596', '231596'] } } } });
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    expect(component.bookingLocations.length).toEqual(2);
  });

  it('should show types of work filter with all types of work filters selected', () => {
    expect(component.fieldsSettings.fields.length).toBe(3);
    const typesOfWorkSelectedFields = component.fieldsSettings.fields[2];
    expect(typesOfWorkSelectedFields.value.length).toBe(typesOfWork.length + 1);
  });

  xit('should store default locations from booking navigation', () => {
    component.bookingLocations = ['Location1'];
    locationService.getSpecificLocations.and.returnValue(['Location1']);
    component.ngOnInit();
    expect(component.defaultLocations).toBe(component.bookingLocations);
    expect(locationService.getSpecificLocations).toHaveBeenCalled();
  });

  it('should set allowTypesOfWorkFilter to true by default', () => {
    expect(component.allowTypesOfWorkFilter).toBe(true);
  });

  it('continues initial filter bootstrap with only role-assigned services when jurisdiction lookup fails', () => {
    fixture.destroy();
    mockWASupportedJurisdictionService.getWASupportedJurisdictions.and.returnValue(
      throwError(() => new Error('jurisdiction lookup unavailable'))
    );
    mockFilterService.persist.calls.reset();

    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    component.persistence = 'session';
    fixture.detectChanges();

    const services = component.fieldsSettings.fields.find((field) => field.name === 'services');
    expect(services?.value).toEqual(['services_all', 'IA']);
    expect(component.fieldsConfig.fields.map((field) => field.name)).toContain('services');
    expect(mockFilterService.persist).toHaveBeenCalled();
    expect(TestBed.inject(InfoMessageCommService).getMessages()).toContain({
      type: InfoMessageType.WARNING,
      message: InfoMessage.WA_JURISDICTIONS_UNAVAILABLE,
    });
  });

  it('preserves a narrower saved service selection within the user role scope when jurisdiction lookup fails', () => {
    fixture.destroy();
    mockWASupportedJurisdictionService.getWASupportedJurisdictions.and.returnValue(
      throwError(() => new Error('jurisdiction lookup unavailable'))
    );
    mockStore.pipe.and.returnValue(
      of({
        roleAssignmentInfo: [
          { jurisdiction: 'IA', roleType: 'ORGANISATION' },
          { jurisdiction: 'SSCS', roleType: 'ORGANISATION' },
        ],
      })
    );
    mockFilterService.get.and.returnValue({
      id: MyWorkFilterComponent.FILTER_NAME,
      fields: [
        { name: 'services', value: ['IA', 'CIVIL'] },
        { name: 'locations', value: [LOCATION] },
      ],
    });
    mockFilterService.persist.calls.reset();

    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    component.persistence = 'session';
    fixture.detectChanges();

    expect(mockFilterService.persist).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({
        fields: jasmine.arrayContaining([
          jasmine.objectContaining({ name: 'services', value: ['IA'] }),
          jasmine.objectContaining({ name: 'locations', value: [LOCATION] }),
        ]),
      }),
      'session'
    );
  });

  it('clears a saved select-all service filter when lookup fails and the user has no organisation jurisdiction', () => {
    fixture.destroy();
    mockWASupportedJurisdictionService.getWASupportedJurisdictions.and.returnValue(
      throwError(() => new Error('jurisdiction lookup unavailable'))
    );
    mockStore.pipe.and.returnValue(of({ roleAssignmentInfo: [] }));
    const savedSetting = {
      id: MyWorkFilterComponent.FILTER_NAME,
      fields: [
        { name: 'services', value: ['services_all'] },
        { name: 'locations', value: [LOCATION] },
      ],
    };
    mockFilterService.get.and.returnValue(savedSetting);
    mockFilterService.persist.calls.reset();

    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    component.persistence = 'session';
    fixture.detectChanges();

    expect(mockFilterService.persist).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({
        id: MyWorkFilterComponent.FILTER_NAME,
        fields: jasmine.arrayContaining([
          jasmine.objectContaining({ name: 'services', value: [] }),
          jasmine.objectContaining({ name: 'locations', value: [LOCATION] }),
        ]),
      }),
      'session'
    );
  });

  it('clears a saved service selection when supported jurisdictions resolve empty', () => {
    fixture.destroy();
    mockWASupportedJurisdictionService.getWASupportedJurisdictions.and.returnValue(of([]));
    mockStore.pipe.and.returnValue(
      of({
        roleAssignmentInfo: [{ jurisdiction: 'IA', roleType: 'ORGANISATION' }],
      })
    );
    mockFilterService.get.and.returnValue({
      id: MyWorkFilterComponent.FILTER_NAME,
      fields: [
        { name: 'services', value: ['services_all', 'IA'] },
        { name: 'locations', value: [LOCATION] },
      ],
    });
    mockFilterService.persist.calls.reset();

    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    component.persistence = 'session';
    const subscribeToFilters = spyOn(component as any, 'subscribeToFilters').and.callThrough();
    fixture.detectChanges();

    expect(mockFilterService.persist).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({
        id: MyWorkFilterComponent.FILTER_NAME,
        fields: jasmine.arrayContaining([
          jasmine.objectContaining({ name: 'services', value: [] }),
          jasmine.objectContaining({ name: 'locations', value: [LOCATION] }),
        ]),
      }),
      'session'
    );
    expect(subscribeToFilters).not.toHaveBeenCalled();
  });

  it('initializes filter fields and subscriptions once after role assignment info is loaded', () => {
    fixture.destroy();
    mockWASupportedJurisdictionService.getWASupportedJurisdictions.and.returnValue(of(['IA', 'SSCS']));
    locationService.path.and.returnValue('/work/my-work/list');
    const userDetails$ = new Subject<any>();
    mockStore.pipe.and.callFake((...operators: OperatorFunction<any, any>[]) =>
      operators.reduce((stream, operator) => operator(stream), userDetails$.asObservable())
    );
    mockFilterService.get.and.returnValue({
      id: MyWorkFilterComponent.FILTER_NAME,
      fields: [{ name: 'locations', value: [LOCATION] }],
    });
    mockFilterService.persist.calls.reset();

    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    component.persistence = 'session';
    const persistFirstSetting = spyOn(component as any, 'persistFirstSetting').and.callThrough();
    const subscribeToFilters = spyOn(component as any, 'subscribeToFilters').and.callThrough();
    fixture.detectChanges();

    userDetails$.next({ appConfig: { userDetails: { userInfo: null } } });
    userDetails$.next({
      appConfig: {
        userDetails: {
          userInfo: { id: 'user-id' },
          roleAssignmentInfo: [{ jurisdiction: 'IA', roleType: 'ORGANISATION', bookable: true }],
        },
      },
    });
    userDetails$.next({
      appConfig: {
        userDetails: {
          userInfo: { id: 'user-id' },
          roleAssignmentInfo: [
            { jurisdiction: 'IA', roleType: 'ORGANISATION', bookable: true },
            { jurisdiction: 'SSCS', roleType: 'ORGANISATION', bookable: true },
          ],
        },
      },
    });

    expect(component.fieldsSettings.fields.filter((field) => field.name === 'locations').length).toBe(1);
    expect(component.fieldsSettings.fields.filter((field) => field.name === 'types-of-work').length).toBe(1);
    expect(persistFirstSetting).toHaveBeenCalledTimes(1);
    expect(subscribeToFilters).toHaveBeenCalledTimes(1);
  });

  it('offers and persists only supported services assigned to a judicial CASE role', () => {
    fixture.destroy();
    mockStore.pipe.and.returnValue(
      of({
        roleAssignmentInfo: [{ jurisdiction: 'IA', roleCategory: RoleCategory.JUDICIAL, roleType: 'CASE' }],
      })
    );
    mockWASupportedJurisdictionService.getWASupportedJurisdictions.and.returnValue(of(['IA', 'SSCS']));
    mockFilterService.get.and.returnValue(null);
    mockFilterService.persist.calls.reset();

    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    component.persistence = 'session';
    fixture.detectChanges();

    const servicesField = component.fieldsConfig.fields.find((field) => field.name === 'services');
    const selectedServices = component.fieldsSettings.fields.find((field) => field.name === 'services')?.value;

    expect(servicesField?.options.map((option) => option.key)).toEqual(['services_all', 'IA']);
    expect(selectedServices).toEqual(['services_all', 'IA']);
    expect(mockFilterService.persist).toHaveBeenCalledWith(
      jasmine.objectContaining({
        fields: jasmine.arrayContaining([jasmine.objectContaining({ name: 'services', value: ['services_all', 'IA'] })]),
      }),
      'session'
    );
  });

  xit('should not get the base location as default location if not within region', () => {
    mockStore.pipe.and.returnValue(
      of({
        roleAssignmentInfo: [
          { jurisdiction: 'IA', roleType: 'ORGANISATION', substantive: 'y', region: '9', baseLocation: '123456' },
        ],
      })
    );
    component.ngOnInit();
    expect(component.defaultLocations).toEqual(['123456']);
    component.defaultLocations = [];
    mockStore.pipe.and.returnValue(
      of({
        roleAssignmentInfo: [
          { jurisdiction: 'IA', roleType: 'ORGANISATION', substantive: 'y', region: '1', baseLocation: '123456' },
        ],
      })
    );
    component.ngOnInit();
    expect(component.defaultLocations).toEqual([]);
  });

  // TODO - as this is integrated with the common-lib it seems as though a fix needs to happen
  // in the common lib GenericFilterComponent component to account for the
  // findLocationField not being present
  xit('should render filter with "Types of work" filter visible', fakeAsync(() => {
    component.onToggleFilter(true);
    fixture.detectChanges();
    tick(500);
    const typesOfWorkParentDivElem = fixture.debugElement.query(By.css('#types-of-work')).parent;
    const styles = getComputedStyle(typesOfWorkParentDivElem.nativeElement);
    const displayProp = styles.getPropertyValue('display');
    expect(displayProp).toEqual('block');
  }));

  // TODO - as this is integrated with the common-lib it seems as though a fix needs to happen
  // in the common lib GenericFilterComponent component to account for the
  // findLocationField not being present
  xit('should render filter with "Types of work" filter NOT visible', fakeAsync(() => {
    component.allowTypesOfWorkFilter = false;
    component.onToggleFilter(false);
    fixture.detectChanges();
    tick(500);
    const typesOfWorkParentDivElem = fixture.debugElement.query(By.css('#types-of-work')).parent;
    const styles = getComputedStyle(typesOfWorkParentDivElem.nativeElement);
    const displayProp = styles.getPropertyValue('display');
    expect(displayProp).toEqual('none');
  }));

  afterAll(() => {
    component.ngOnDestroy();
  });
});
