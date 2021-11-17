import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { NoResultsMessageId } from 'src/search/enums';
import { NoResultsComponent } from './no-results.component';

describe('NoResultsComponent', () => {
  let component: NoResultsComponent;
  let fixture: ComponentFixture<NoResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoResultsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule ],
      providers: [
        { 
          provide: ActivatedRoute,
          useValue: {
            paramMap: Observable.of({
              id: NoResultsMessageId.NO_RESULTS
            })
          }
        }
      ]
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
    expect(fixture.debugElement.nativeElement.querySelector('.govuk-width-container').innerText).toContain('search using different criteria');
  });

  fit('should display something went wrong content if error', () => {
    TestBed.overrideProvider(ActivatedRoute, { 
      useValue: {
        paramMap: Observable.of({
          id: NoResultsMessageId.ERROR
        })
      }
    });
    component.messageId = NoResultsMessageId.ERROR;
    component.ngOnInit();
    expect(fixture.debugElement.nativeElement.querySelector('.govuk-width-container').innerText).toContain('search using different criteria');
  });
});
