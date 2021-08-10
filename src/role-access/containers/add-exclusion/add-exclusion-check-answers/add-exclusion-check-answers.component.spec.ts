import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AnswersComponent } from '../../../components';
import { ExcludeOption, ExclusionNavigationEvent, ExclusionState, PersonRole } from '../../../models';
import * as fromFeature from '../../../store';
import { ConfirmExclusionAction } from '../../../store/actions';
import { AddExclusionCheckAnswersComponent } from './add-exclusion-check-answers.component';

describe('AddExclusionCheckAnswersComponent', () => {
  let component: AddExclusionCheckAnswersComponent;
  let fixture: ComponentFixture<AddExclusionCheckAnswersComponent>;
  let mockStore: any;
  const pipeSubject: Subject<any> = new Subject<any>();

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);
    mockStore.pipe.and.returnValue(pipeSubject);

    TestBed.configureTestingModule({
      declarations: [AnswersComponent, AddExclusionCheckAnswersComponent],
      providers: [
        {
          provide: Store, useValue: mockStore
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AddExclusionCheckAnswersComponent);
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

  describe('navigationHandler()', () => {
    it('should dispatch the confirm exclusion action with an undefined payroll', () => {
      component.navigationHandler(ExclusionNavigationEvent.CONFIRM_EXCLUSION);
      expect(mockStore.dispatch).toHaveBeenCalledWith(new ConfirmExclusionAction(undefined));
    });

    it('should throw an error if there is an invalid navigation action', () => {
      expect(() => { component.navigationHandler(ExclusionNavigationEvent.CONTINUE); }).toThrow(new Error('Invalid option'));
    });
  });

  const setup = (exclusionOption: ExcludeOption): void => {
    const exclusionStateData = {
      personRole: PersonRole.JUDICIAL,
      person: {
        name: 'Judge Judy',
        email: 'judge@judy.com',
        exclusionDescription: 'the exclusion description'
      },
      exclusionOption
    };
    pipeSubject.next(exclusionStateData);
  };

  describe('onNavigate()', () => {
    it('should dispatch a change navigation when called', () => {
      setup(ExcludeOption.EXCLUDE_ANOTHER_PERSON);
      component.onNavigate(ExclusionState.CONFIRM_EXCLUSION);
      expect(mockStore.dispatch).toHaveBeenCalledWith(new fromFeature.ChangeNavigation(ExclusionState.CONFIRM_EXCLUSION));
    });
  });

  describe('setAnswersFromExclusionStore()', () => {

    it('should set all answers if excluding another person', () => {
      setup(ExcludeOption.EXCLUDE_ANOTHER_PERSON);
      expect(component.answers.length).toEqual(4);
    });

    it('should only add the person and description if excluding me', () => {
      setup(ExcludeOption.EXCLUDE_ME);
      expect(component.answers.length).toEqual(2);
    });
  });

  describe('onDestroy()', () => {
    it('should unsubscribe', () => {
      component.storeSubscription = new Observable().subscribe();
      spyOn(component.storeSubscription, 'unsubscribe').and.callThrough();
      component.ngOnDestroy();
      expect(component.storeSubscription.unsubscribe).toHaveBeenCalled();
    });
  });

});
