import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { SearchFormControl, SearchStatePersistenceKey } from '../../enums';
import { SearchParameters } from '../../models';
import { SearchService } from '../../services/search.service';
import { SearchFormComponent } from './search-form.component';

import createSpyObj = jasmine.createSpyObj;

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  const formBuilder = new FormBuilder();
  let searchService: jasmine.SpyObj<SearchService>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    searchService = createSpyObj<SearchService>('searchService', ['getServices', 'storeState', 'retrieveState']);
    searchService.getServices.and.returnValue(of([
      {serviceName: 'Test service', serviceId: 'TEST'},
      {serviceName: 'Another test service', serviceId: 'TEST2'}
    ]));
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterTestingModule ],
      declarations: [ SearchFormComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: SearchService, useValue: searchService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    spyOn(router, 'navigate');
    route = TestBed.get(ActivatedRoute);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have called ngOnInit and populate the Services list', () => {
    expect(component.ngOnInit).toBeTruthy();
    expect(component.searchServiceSubscription$).toBeTruthy();
    expect(searchService.getServices).toHaveBeenCalled();
    expect(component.services.length).toEqual(3);
    expect(component.services).toEqual([
      {label: 'All', value: 'ALL', id: 'ALL'},
      {label: 'Test service', value: 'TEST', id: 'TEST'},
      {label: 'Another test service', value: 'TEST2', id: 'TEST2'}
    ]);
    expect(component.formGroup.get(SearchFormControl.SERVICES_LIST).value).toEqual('ALL');
  });

  it('should unsubscribe subscriptions onDestroy', () => {
    component.searchServiceSubscription$ = new Observable().subscribe();
    spyOn(component.searchServiceSubscription$, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    expect(component.searchServiceSubscription$.unsubscribe).toHaveBeenCalled();
  });

  it('should store search parameters, set start record number, and navigate to Search Results page on form submission', () => {
    component.formGroup.get(SearchFormControl.CASE_REF).setValue('1234123412341234');
    component.formGroup.get(SearchFormControl.OTHER_REF).setValue('Abc');
    component.formGroup.get(SearchFormControl.FULL_NAME).setValue('Test test');
    component.formGroup.get(SearchFormControl.ADDRESS_LINE_1).setValue('102 Petty France');
    component.formGroup.get(SearchFormControl.POSTCODE).setValue('SW1H 9AJ');
    component.formGroup.get(SearchFormControl.EMAIL).setValue('test@example.com');
    component.formGroup.get(SearchFormControl.DATE_OF_BIRTH_DAY).setValue('1');
    component.formGroup.get(SearchFormControl.DATE_OF_BIRTH_MONTH).setValue('10');
    component.formGroup.get(SearchFormControl.DATE_OF_BIRTH_YEAR).setValue('1980');
    component.formGroup.get(SearchFormControl.DATE_OF_DEATH_DAY).setValue('2');
    component.formGroup.get(SearchFormControl.DATE_OF_DEATH_MONTH).setValue('2');
    component.formGroup.get(SearchFormControl.DATE_OF_DEATH_YEAR).setValue('2020');
    component.formGroup.get(SearchFormControl.SERVICES_LIST).setValue('ALL');
    component.onSubmit();

    // Check how many times the spy was called
    expect(searchService.storeState).toHaveBeenCalledTimes(2);

    // Check arguments
    expect(searchService.storeState.calls.all()[0].args[0]).toEqual(SearchStatePersistenceKey.SEARCH_PARAMS);
    expect(searchService.storeState.calls.all()[0].args[1]).toEqual({
      caseReferences: ['1234123412341234'],
      // Service selection is "All", hence all service IDs are expected to be present
      CCDJurisdictionIds: ['TEST', 'TEST2'],
      otherReferences: ['Abc'],
      fullName: 'Test test',
      address: '102 Petty France',
      postcode: 'SW1H 9AJ',
      emailAddress: 'test@example.com',
      dateOfBirth: '1980-10-1',
      dateOfDeath: '2020-2-2'
    } as SearchParameters);
    expect(searchService.storeState.calls.all()[1].args[0]).toEqual(SearchStatePersistenceKey.START_RECORD);
    expect(searchService.storeState.calls.all()[1].args[1]).toEqual(1);

    expect(router.navigate).toHaveBeenCalledWith(['results'], {relativeTo: route});
  });

  it('should store the selected service in the search parameters when the selected value is not \"All\"', () => {
    component.formGroup.get(SearchFormControl.CASE_REF).setValue('1234123412341234');
    component.formGroup.get(SearchFormControl.SERVICES_LIST).setValue('TEST');
    component.onSubmit();

    // Check how many times the spy was called
    expect(searchService.storeState).toHaveBeenCalledTimes(2);

    // Check arguments
    expect(searchService.storeState.calls.all()[0].args[0]).toEqual(SearchStatePersistenceKey.SEARCH_PARAMS);
    expect(searchService.storeState.calls.all()[0].args[1]).toEqual({
      caseReferences: ['1234123412341234'],
      CCDJurisdictionIds: ['TEST'],
      otherReferences: null,
      fullName: null,
      address: null,
      postcode: null,
      emailAddress: null,
      dateOfBirth: null,
      dateOfDeath: null
    } as SearchParameters);
  });

  it('should reset validation error messages', () => {
    component.resetValidationErrorMessages();

    expect(component.searchValidationErrors.length).toEqual(0);
    expect(component.emailErrorMessage).toEqual(null);
    expect(component.postcodeErrorMessage).toEqual(null);
    expect(component.dateOfBirthErrorMessage).toEqual(null);
    expect(component.dateOfDeathErrorMessage).toEqual(null);
  });

  it('should isAnyError function return correct state', () => {
    component.formGroup.get(SearchFormControl.DATE_OF_BIRTH_DAY).setValue(32);
    component.onSubmit();
    expect(component.isAnyError()).toEqual(true);

    component.formGroup.get(SearchFormControl.DATE_OF_BIRTH_DAY).setValue(10);
    component.onSubmit();
    expect(component.isAnyError()).toEqual(false);
  });

  it('should validateForm function return correct state', () => {
    component.formGroup.get(SearchFormControl.POSTCODE).setValue('WRONGPOSTCODE');
    component.onSubmit();
    expect(component.formGroup.valid).toEqual(false);

    component.formGroup.get(SearchFormControl.POSTCODE).setValue('B5 6AB');
    component.onSubmit();
    expect(component.formGroup.valid).toEqual(true);
  });

  it('should return null for empty fields on form submit', () => {
    // Submit the form with empty values other than jurisdiction
    component.onSubmit();
    // Check how many times the spy was called
    expect(searchService.storeState).toHaveBeenCalledTimes(2);
    // Check arguments
    expect(searchService.storeState.calls.all()[0].args[0]).toEqual(SearchStatePersistenceKey.SEARCH_PARAMS);
    expect(searchService.storeState.calls.all()[0].args[1]).toEqual({
      caseReferences: null,
      // Default service selection is "All", hence all service IDs are expected to be present
      CCDJurisdictionIds: ['TEST', 'TEST2'],
      otherReferences: null,
      fullName: null,
      address: null,
      postcode: null,
      emailAddress: null,
      dateOfBirth: null,
      dateOfDeath: null
    } as SearchParameters);
  });

  it('should scroll to top and display error summary if validation failed', () => {
    spyOn(window, 'scrollTo');
    component.formGroup.get(SearchFormControl.EMAIL).setValue('WRONGEMAIL');
    component.onSubmit();
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('should pre-populate the form with existing search parameters', () => {
    searchService.retrieveState.and.returnValue({
      caseReferences: ['1234123412341234'],
      CCDJurisdictionIds: ['TEST'],
      otherReferences: ['Abc'],
      fullName: 'Test test',
      address: '102 Petty France',
      postcode: 'SW1H 9AJ',
      emailAddress: 'test@example.com',
      dateOfBirth: '1980-10-1',
      dateOfDeath: '2020-2-2'
    } as SearchParameters);
    component.ngOnInit();
    expect(searchService.retrieveState).toHaveBeenCalledWith(SearchStatePersistenceKey.SEARCH_PARAMS);
    expect(component.formGroup.get(SearchFormControl.CASE_REF).value).toEqual('1234123412341234');
    expect(component.formGroup.get(SearchFormControl.OTHER_REF).value).toEqual('Abc');
    expect(component.formGroup.get(SearchFormControl.FULL_NAME).value).toEqual('Test test');
    expect(component.formGroup.get(SearchFormControl.ADDRESS_LINE_1).value).toEqual('102 Petty France');
    expect(component.formGroup.get(SearchFormControl.POSTCODE).value).toEqual('SW1H 9AJ');
    expect(component.formGroup.get(SearchFormControl.EMAIL).value).toEqual('test@example.com');
    expect(component.formGroup.get(SearchFormControl.DATE_OF_BIRTH_DAY).value).toEqual('1');
    expect(component.formGroup.get(SearchFormControl.DATE_OF_BIRTH_MONTH).value).toEqual('10');
    expect(component.formGroup.get(SearchFormControl.DATE_OF_BIRTH_YEAR).value).toEqual('1980');
    expect(component.formGroup.get(SearchFormControl.DATE_OF_DEATH_DAY).value).toEqual('2');
    expect(component.formGroup.get(SearchFormControl.DATE_OF_DEATH_MONTH).value).toEqual('2');
    expect(component.formGroup.get(SearchFormControl.DATE_OF_DEATH_YEAR).value).toEqual('2020');
    expect(component.formGroup.get(SearchFormControl.SERVICES_LIST).value).toEqual('TEST');
  });

  it('should leave the selected service as \"All\" if existing search parameters contain more than one service', () => {
    searchService.retrieveState.and.returnValue({
      caseReferences: ['1234123412341234'],
      CCDJurisdictionIds: ['TEST', 'TEST2'],
      otherReferences: null,
      fullName: null,
      address: null,
      postcode: null,
      emailAddress: null,
      dateOfBirth: null,
      dateOfDeath: null
    } as SearchParameters);
    component.ngOnInit();
    expect(searchService.retrieveState).toHaveBeenCalledWith(SearchStatePersistenceKey.SEARCH_PARAMS);
    expect(component.formGroup.get(SearchFormControl.CASE_REF).value).toEqual('1234123412341234');
    expect(component.formGroup.get(SearchFormControl.OTHER_REF).value).toEqual('');
    expect(component.formGroup.get(SearchFormControl.SERVICES_LIST).value).toEqual('ALL');
  });
});
