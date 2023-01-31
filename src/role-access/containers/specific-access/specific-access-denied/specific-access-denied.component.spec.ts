import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { SpecificAccessState } from '../../../models';
import { SpecificAccessDeniedComponent } from './specific-access-denied.component';

describe('SpecificAccessDeniedComponent', () => {
  let component: SpecificAccessDeniedComponent;
  let fixture: ComponentFixture<SpecificAccessDeniedComponent>;
  let mockStore: any;
  const mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
  const pipeSubject: Subject<any> = new Subject<any>();

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);
    mockStore.pipe.and.returnValue(pipeSubject);

    TestBed.configureTestingModule({
      declarations: [SpecificAccessDeniedComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: Store, useValue: mockStore
        },
        {
          provide: Router, useValue: mockRouter
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(SpecificAccessDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navigation', () => {

    it('should create component and show the correct message', () => {
      expect(component).toBeDefined();
      const confirmationMessageElement = fixture.debugElement.nativeElement.querySelector('.govuk-panel__title');
      expect(confirmationMessageElement.textContent).toContain('Request for access denied');
    });

    it('should show the correct message for heading', () => {
      const confirmationMessageElement = fixture.debugElement.nativeElement.querySelector('.govuk-heading-m');
      expect(confirmationMessageElement.textContent).toContain('What happens next');
    });

    it('should dispatch a change navigation when called', () => {
      component.onNavigate(SpecificAccessState.SPECIFIC_ACCESS_DENIED);
      expect(mockStore.dispatch).toHaveBeenCalled();
    });

  });

});
