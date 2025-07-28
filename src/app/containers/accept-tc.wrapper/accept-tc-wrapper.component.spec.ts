import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { of, Subject, throwError } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AcceptTcWrapperComponent } from './accept-tc-wrapper.component';
import * as fromApp from '../../../../src/app/store/index';
import * as fromStore from '../../store';

describe('Accept Tc Wrapper Component', () => {
  let component: AcceptTcWrapperComponent;
  let fixture: ComponentFixture<AcceptTcWrapperComponent>;
  let mockStore: jasmine.SpyObj<Store<fromApp.State>>;
  let mockActions$: jasmine.SpyObj<Actions>;
  let actionsSubject: Subject<Action>;

  class TestAction implements Action {
    public type: string;
  }

  beforeEach(waitForAsync(() => {
    actionsSubject = new Subject<Action>();
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);
    mockActions$ = jasmine.createSpyObj('Actions', ['pipe']);
    
    // Mock the pipe method to return a filtered observable based on the action type
    mockActions$.pipe.and.callFake(() => {
      // The ofType operator filters actions by type
      // We simulate this behavior by filtering for ACCEPT_T_AND_C_SUCCESS
      return actionsSubject.asObservable().pipe(
        filter((action: Action) => action.type === fromApp.ACCEPT_T_AND_C_SUCCESS)
      );
    });

    TestBed.configureTestingModule({
      declarations: [AcceptTcWrapperComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Actions, useValue: mockActions$ }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptTcWrapperComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    if (component.subscription) {
      component.subscription.unsubscribe();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should subscribe to ACCEPT_T_AND_C_SUCCESS action', () => {
      fixture.detectChanges();
      expect(mockActions$.pipe).toHaveBeenCalled();
      expect(component.subscription).toBeDefined();
    });

    it('should dispatch navigation action when ACCEPT_T_AND_C_SUCCESS is triggered', () => {
      fixture.detectChanges();
      
      const acceptAction = { type: fromApp.ACCEPT_T_AND_C_SUCCESS };
      actionsSubject.next(acceptAction);
      
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: fromStore.GO,
          payload: { path: ['cases'] }
        })
      );
    });

    it('should handle multiple ACCEPT_T_AND_C_SUCCESS actions', () => {
      fixture.detectChanges();
      
      const acceptAction = { type: fromApp.ACCEPT_T_AND_C_SUCCESS };
      actionsSubject.next(acceptAction);
      actionsSubject.next(acceptAction);
      
      expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
    });

    it('should not dispatch action for different action types', () => {
      fixture.detectChanges();
      
      const differentAction = { type: 'DIFFERENT_ACTION' };
      actionsSubject.next(differentAction);
      
      expect(mockStore.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from actions subscription', () => {
      fixture.detectChanges();
      const unsubscribeSpy = spyOn(component.subscription, 'unsubscribe');
      
      component.ngOnDestroy();
      
      expect(unsubscribeSpy).toHaveBeenCalled();
    });

    it('should handle ngOnDestroy when subscription is undefined', () => {
      component.subscription = undefined;
      
      expect(() => component.ngOnDestroy()).not.toThrow();
    });

    it('should handle ngOnDestroy when subscription is null', () => {
      component.subscription = null;
      
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('unsubscribe', () => {
    it('should unsubscribe from valid subscription', () => {
      const subscription = jasmine.createSpyObj('subscription', ['unsubscribe']);
      
      component.unsubscribe(subscription);
      
      expect(subscription.unsubscribe).toHaveBeenCalled();
    });

    it('should handle null subscription', () => {
      expect(() => component.unsubscribe(null)).not.toThrow();
    });

    it('should handle undefined subscription', () => {
      expect(() => component.unsubscribe(undefined)).not.toThrow();
    });

    it('should handle subscription that throws error on unsubscribe', () => {
      const subscription = jasmine.createSpyObj('subscription', ['unsubscribe']);
      subscription.unsubscribe.and.throwError('Unsubscribe error');
      
      expect(() => component.unsubscribe(subscription)).toThrow();
    });
  });

  describe('dispatchAction', () => {
    it('should dispatch action to store', () => {
      const action = new TestAction();
      
      component.dispatchAction(mockStore, action);
      
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });

    it('should dispatch multiple actions', () => {
      const action1 = new TestAction();
      const action2 = new TestAction();
      
      component.dispatchAction(mockStore, action1);
      component.dispatchAction(mockStore, action2);
      
      expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action1);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action2);
    });

    it('should handle null action', () => {
      component.dispatchAction(mockStore, null);
      
      expect(mockStore.dispatch).toHaveBeenCalledWith(null);
    });
  });

  describe('getObservable', () => {
    it('should return filtered observable for specific action', () => {
      const result = component.getObservable(mockActions$, 'Some Action');
      
      expect(mockActions$.pipe).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should handle empty action string', () => {
      const result = component.getObservable(mockActions$, '');
      
      expect(mockActions$.pipe).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should handle null action string', () => {
      const result = component.getObservable(mockActions$, null);
      
      expect(mockActions$.pipe).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should return observable that can be subscribed to', () => {
      mockActions$.pipe.and.returnValue(of({ type: 'TEST_ACTION' }));
      
      const result = component.getObservable(mockActions$, 'TEST_ACTION');
      
      let emittedValue: any;
      result.subscribe(value => emittedValue = value);
      
      expect(emittedValue).toEqual({ type: 'TEST_ACTION' });
    });

    it('should handle observable errors', () => {
      const error = new Error('Observable error');
      mockActions$.pipe.and.returnValue(throwError(() => error));
      
      const result = component.getObservable(mockActions$, 'ERROR_ACTION');
      
      result.subscribe({
        next: () => fail('should have failed'),
        error: (err) => expect(err).toBe(error)
      });
    });
  });

  describe('onAcceptTandC', () => {
    it('should be defined', () => {
      expect(component.onAcceptTandC).toBeDefined();
    });

    it('should execute without errors', () => {
      expect(() => component.onAcceptTandC()).not.toThrow();
    });
  });

  describe('Component Template', () => {
    it('should render exui-app-header', () => {
      fixture.detectChanges();
      const header = fixture.debugElement.query(By.css('exui-app-header'));
      expect(header).toBeTruthy();
    });

    it('should render xuilib-tc-confirm component', () => {
      fixture.detectChanges();
      const tcConfirm = fixture.debugElement.query(By.css('xuilib-tc-confirm'));
      expect(tcConfirm).toBeTruthy();
    });

    it('should have correct attributes on tc-confirm component', () => {
      fixture.detectChanges();
      const tcConfirm = fixture.debugElement.query(By.css('xuilib-tc-confirm'));
      
      expect(tcConfirm.nativeElement.getAttribute('id')).toBe('content');
      expect(tcConfirm.nativeElement.getAttribute('role')).toBe('main');
      expect(tcConfirm.nativeElement.getAttribute('buttonText')).toBe('Confirm');
    });

    it('should render exui-app-footer', () => {
      fixture.detectChanges();
      const footer = fixture.debugElement.query(By.css('exui-app-footer'));
      expect(footer).toBeTruthy();
    });

    it('should call onAcceptTandC when confirm event is emitted', () => {
      spyOn(component, 'onAcceptTandC');
      fixture.detectChanges();
      
      const tcConfirm = fixture.debugElement.query(By.css('xuilib-tc-confirm'));
      tcConfirm.triggerEventHandler('confirm', null);
      
      expect(component.onAcceptTandC).toHaveBeenCalled();
    });

    it('should handle multiple confirm events', () => {
      spyOn(component, 'onAcceptTandC');
      fixture.detectChanges();
      
      const tcConfirm = fixture.debugElement.query(By.css('xuilib-tc-confirm'));
      tcConfirm.triggerEventHandler('confirm', null);
      tcConfirm.triggerEventHandler('confirm', null);
      tcConfirm.triggerEventHandler('confirm', null);
      
      expect(component.onAcceptTandC).toHaveBeenCalledTimes(3);
    });
  });

  describe('Integration Tests', () => {
    it('should complete full flow from init to destroy', () => {
      fixture.detectChanges();
      
      expect(component.subscription).toBeDefined();
      
      const acceptAction = { type: fromApp.ACCEPT_T_AND_C_SUCCESS };
      actionsSubject.next(acceptAction);
      
      expect(mockStore.dispatch).toHaveBeenCalled();
      
      spyOn(component.subscription, 'unsubscribe');
      component.ngOnDestroy();
      
      expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });

    it('should handle component lifecycle with no actions', () => {
      fixture.detectChanges();
      
      expect(component.subscription).toBeDefined();
      
      spyOn(component.subscription, 'unsubscribe');
      component.ngOnDestroy();
      
      expect(component.subscription.unsubscribe).toHaveBeenCalled();
      expect(mockStore.dispatch).not.toHaveBeenCalled();
    });
  });
});