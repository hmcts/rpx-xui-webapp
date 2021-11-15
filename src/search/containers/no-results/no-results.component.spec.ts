import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { NoResultsComponent } from './no-results.component';

fdescribe('NoResultsComponent', () => {
  let component: NoResultsComponent;
  let fixture: ComponentFixture<NoResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoResultsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe subscriptions onDestroy', () => {
    component.paramMapSubscription$ = new Observable().subscribe();
    spyOn(component.paramMapSubscription$, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    expect(component.paramMapSubscription$.unsubscribe).toHaveBeenCalled();
  });

  it('should display no results content if no error', () => {
    component.isError = false;
    expect(fixture.debugElement.nativeElement.querySelector('.govuk-heading-xl').innerText).toContain('No results');
  });

  it('should display something went wrong content if error', () => {
    component.isError = true;
    expect(fixture.debugElement.nativeElement.querySelector('.govuk-heading-xl').innerText).toContain('Something went wrong');
  });
});
