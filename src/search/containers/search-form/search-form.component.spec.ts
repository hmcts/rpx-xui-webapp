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
    searchService = createSpyObj<SearchService>('searchService', ['getServices', 'storeState']);
    searchService.getServices.and.returnValue(of([{serviceName: 'Test service', serviceId: 'TEST'}]));
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
    expect(component.services.length).toEqual(2);
    expect(component.services).toEqual([
      {label: 'All', value: 'All', id: 'All'},
      {label: 'Test service', value: 'TEST', id: 'TEST'}
    ]);
    expect(component.formGroup.get(SearchFormControl.SERVICES_LIST).value).toEqual('All');
  });

  it('should unsubscribe subscriptions onDestroy', () => {
    component.searchServiceSubscription$ = new Observable().subscribe();
    spyOn(component.searchServiceSubscription$, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    expect(component.searchServiceSubscription$.unsubscribe).toHaveBeenCalled();
  });

  it('should store search parameters, set start record number, and navigate to Search Results page on form submission', () => {
    component.formGroup.get('caseRef').setValue('1234123412341234');
    component.formGroup.get('otherRef').setValue('Abc');
    component.formGroup.get('fullName').setValue('Test test');
    component.formGroup.get('addressLine1').setValue('102 Petty France');
    component.formGroup.get('postcode').setValue('SW1H 9AJ');
    component.formGroup.get('email').setValue('test@example.com');
    component.formGroup.get('dateOfBirth_day').setValue('1');
    component.formGroup.get('dateOfBirth_month').setValue('10');
    component.formGroup.get('dateOfBirth_year').setValue('1980');
    component.formGroup.get('dateOfDeath_day').setValue('2');
    component.formGroup.get('dateOfDeath_month').setValue('2');
    component.formGroup.get('dateOfDeath_year').setValue('2020');
    component.formGroup.get('servicesList').setValue('All');
    component.onSubmit();

    // Check how many times the spy was called
    expect(searchService.storeState).toHaveBeenCalledTimes(2);

    // Check arguments
    expect(searchService.storeState.calls.all()[0].args[0]).toEqual(SearchStatePersistenceKey.SEARCH_PARAMS);
    expect(searchService.storeState.calls.all()[0].args[1]).toEqual({
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
    expect(searchService.storeState.calls.all()[1].args[0]).toEqual(SearchStatePersistenceKey.START_RECORD);
    expect(searchService.storeState.calls.all()[1].args[1]).toEqual(1);

    expect(router.navigate).toHaveBeenCalledWith(['results'], {relativeTo: route});
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
});
