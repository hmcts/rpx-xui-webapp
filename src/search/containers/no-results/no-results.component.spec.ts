import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, ReplaySubject } from 'rxjs';
import { NoResultsMessageId } from 'src/search/enums';
import { NoResultsComponent } from './no-results.component';

export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject = new ReplaySubject<ParamMap>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  /** The mock paramMap observable */
  readonly paramMap = this.subject.asObservable();

  /** Set the paramMap observables's next value */
  setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
  }
}

describe('NoResultsComponent', () => {
  let component: NoResultsComponent;
  let fixture: ComponentFixture<NoResultsComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub({ id: NoResultsMessageId.NO_RESULTS });
    TestBed.configureTestingModule({
      declarations: [ NoResultsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule ],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }]
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
    component.messageId = NoResultsMessageId.NO_RESULTS;
    activatedRoute.paramMap.subscribe(params => {
      if (Number(params.get('id')) === NoResultsMessageId.NO_RESULTS) {
        expect(fixture.debugElement.nativeElement.querySelector('.govuk-width-container').innerText).toContain('search using different criteria');
      }
    });
  });

  it('should display something went wrong content if error', () => {
    const activatedRoute2 = new ActivatedRouteStub({ id: NoResultsMessageId.ERROR });
    TestBed.overrideProvider(ActivatedRoute, { useValue: activatedRoute2 });

    component.messageId = NoResultsMessageId.ERROR;
    activatedRoute.paramMap.subscribe(params => {
      if (Number(params.get('id')) === NoResultsMessageId.ERROR) {
        expect(fixture.debugElement.nativeElement.querySelector('.govuk-width-container').innerText).toContain('search for as many fields as possible');
      }
    });
  });
});
