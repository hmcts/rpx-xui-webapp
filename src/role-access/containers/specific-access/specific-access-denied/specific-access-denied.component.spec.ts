import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { SpecificAccessNavigationEvent, SpecificAccessState } from '../../../models';
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

    it('should correctly navigate on click of return to my tasks button when dispatching the event', () => {
      const navEvent = SpecificAccessNavigationEvent.RETURNTOMYTASKS;
      component.navigationHandler(navEvent);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/work/my-work/list'])
    });

    it('should correctly navigate on click of return to my tasks button when dispatching the event', () => {
      component.caseId = '123456789';
      const navEvent = SpecificAccessNavigationEvent.RETURNTOTASKSTAB;
      component.navigationHandler(navEvent);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/cases/case-details/123456789'])
    });

    it('should dispatch a change navigation when called', () => {
      component.onNavigate(SpecificAccessState.SPECIFIC_ACCESS_DENIED);
      expect(mockStore.dispatch).toHaveBeenCalled();
    });

  });

});
