import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NoResultsMessageId } from '../../enums';
import { NoResultsComponent } from './no-results.component';

describe('NoResultsComponent', () => {
  let component: NoResultsComponent;
  let fixture: ComponentFixture<NoResultsComponent>;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoResultsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule.withRoutes([]) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    route = TestBed.get(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display no results content if no error', () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue(NoResultsMessageId.NO_RESULTS);
    // We have to TestBed.createComponent again for the activated route to work
    fixture = TestBed.createComponent(NoResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.messageId = NoResultsMessageId.NO_RESULTS;
    expect(fixture.debugElement.nativeElement.querySelector('.govuk-width-container').innerText).toContain('search using different criteria');
  });

  it('should display something went wrong content if error', () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue(NoResultsMessageId.ERROR);
    // We have to TestBed.createComponent again for the activated route to work
    fixture = TestBed.createComponent(NoResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.messageId = NoResultsMessageId.ERROR;
    expect(fixture.debugElement.nativeElement.querySelector('.govuk-width-container').innerText).toContain('search for as many fields as possible');
  });

  it('should display no results content if 16 digit case reference error', () => {
    const activatedRoute = new ActivatedRouteStub({ id: NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH });
    TestBed.overrideProvider(ActivatedRoute, { useValue: activatedRoute });

    component.messageId = NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH;
    activatedRoute.paramMap.subscribe(params => {
      if (Number(params.get('id')) === NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH) {
        expect(fixture.debugElement.nativeElement.querySelector('.govuk-width-container').innerText).toContain('This 16-digit case reference could not be found.');
      }
    });
  });
});
