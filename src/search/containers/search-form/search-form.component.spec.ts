import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

import { SearchFormComponent } from './search-form.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  const formBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
    expect(component.searchServiceSubscription).toBeDefined();
    expect(component.formGroup.get('servicesList').value).toEqual('All');
  });

  it('should unsubscribe subscriptions onDestroy', () => {
    component.searchServiceSubscription = new Observable().subscribe();
    spyOn(component.searchServiceSubscription, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    expect(component.searchServiceSubscription.unsubscribe).toHaveBeenCalled();
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
    component.formGroup.get('dateOfBirth_day').setValue(32);
    component.onSubmit();
    expect(component.isAnyError()).toEqual(true);

    component.formGroup.get('dateOfBirth_day').setValue(10);
    component.onSubmit();
    expect(component.isAnyError()).toEqual(false);
  });

  it('should validateForm function return correct state', () => {
    component.formGroup.get('postcode').setValue('WRONGPOSTCODE');
    component.onSubmit();
    expect(component.formGroup.valid).toEqual(false);

    component.formGroup.get('postcode').setValue('B5 6AB');
    component.onSubmit();
    expect(component.formGroup.valid).toEqual(true);
  });
});
