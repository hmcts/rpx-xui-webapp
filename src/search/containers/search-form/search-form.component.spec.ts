import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { SearchFormComponent } from './search-form.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  const formBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormComponent ],
      imports: [ HttpClientModule ],
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
});
