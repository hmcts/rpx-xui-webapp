import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import * as fromActions from '../../../app/store';
import { NoResultsMessageId } from '../../enums';
import { NoResultsComponent } from './no-results.component';

describe('NoResultsComponent', () => {
  let component: NoResultsComponent;
  let fixture: ComponentFixture<NoResultsComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let store: Store<fromActions.State>;
  const storeMock = jasmine.createSpyObj('Store', [
    'dispatch'
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoResultsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule.withRoutes([]) ],
      providers: [{ provide: Store, useValue: storeMock }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockRouter = TestBed.get(Router);
    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display no results content if no error', () => {
    spyOn(mockRouter, 'getCurrentNavigation').and.returnValues({ extras: { state: { messageId: NoResultsMessageId.NO_RESULTS } } });
    // We have to TestBed.createComponent again for the activated route to work
    fixture = TestBed.createComponent(NoResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.messageId = NoResultsMessageId.NO_RESULTS;
    expect(fixture.debugElement.nativeElement.querySelector('.govuk-width-container').innerText).toContain('search using different criteria');
  });

  it('should display something went wrong content if error', () => {
    spyOn(mockRouter, 'getCurrentNavigation').and.returnValues({ extras: { state: { messageId: NoResultsMessageId.ERROR } } });
    // We have to TestBed.createComponent again for the activated route to work
    fixture = TestBed.createComponent(NoResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.messageId = NoResultsMessageId.ERROR;
    expect(fixture.debugElement.nativeElement.querySelector('.govuk-width-container').innerText).toContain('search for as many fields as possible');
  });

  it('should display no results content if 16 digit case reference error', () => {
    spyOn(mockRouter, 'getCurrentNavigation').and.returnValues({ extras: { state: { messageId: NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH } } });
    // We have to TestBed.createComponent again for the activated route to work
    fixture = TestBed.createComponent(NoResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.messageId = NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH;
    expect(fixture.debugElement.nativeElement.querySelector('.govuk-width-container').innerText).toContain('This 16-digit case reference could not be found.');
    expect(storeMock.dispatch).toHaveBeenCalled();
  });
});
