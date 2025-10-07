import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ExuiCcdConnectorComponent } from './exui-ccd-connector.component';

@Component({
  standalone: false,

  selector: 'ccd-test-component',
  template: ''

})
class MockCcdComponent {
  @Output() submitted = new EventEmitter();
  @Output() cancelled = new EventEmitter();
}

@Component({
  standalone: false,

  template: `
    <exui-ccd-connector
      [store]="store"
      [fromFeatureStore]="fromFeatureStore"
      [eventsBindings]="eventsBindings">
      <ccd-test-component #ccdComponent></ccd-test-component>
    </exui-ccd-connector>
  `

})
class TestHostComponent {
  store: any;
  fromFeatureStore: any;
  eventsBindings: any[];
}

describe('CCD Connector Component', () => {
  let component: ExuiCcdConnectorComponent;
  let fixture: ComponentFixture<ExuiCcdConnectorComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let mockStore: jasmine.SpyObj<Store<any>>;
  let mockCcdComponent: MockCcdComponent;

  beforeEach(waitForAsync(() => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      declarations: [
        ExuiCcdConnectorComponent,
        MockCcdComponent,
        TestHostComponent
      ],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExuiCcdConnectorComponent);
    component = fixture.componentInstance;
    component.store = mockStore;
    component.eventsBindings = [
      { type: 'cancelled', action: 'CreateCaseReset' },
      { type: 'submitted', action: 'ApplyChange' }
    ];
    component.fromFeatureStore = {
      CreateCaseReset: class {
        constructor(public payload: any) {}
      },
      ApplyChange: class {
        constructor(public payload: any) {}
      }
    };
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('simplifyFormGroup()', () => {
    it('should return an object', () => {
      const object = {
        a: 'value'
      };

      expect(component.simplifyFormGroup(object)).toEqual({ a: 'value' });
    });

    it('should set the formGroupValue as the key.', () => {
      const object = {
        formGroup: 'formGroupValue'
      };

      expect(component.simplifyFormGroup(object)).toEqual({ formGroup: { value: undefined } });
    });
  });

  describe('ngAfterContentInit', () => {
    beforeEach(() => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostComponent.store = mockStore;
      hostComponent.eventsBindings = [
        { type: 'submitted', action: 'ApplyChange' },
        { type: 'cancelled', action: 'CreateCaseReset' }
      ];
      hostComponent.fromFeatureStore = {
        CreateCaseReset: class {
          constructor(public payload: any) {}
        },
        ApplyChange: class {
          constructor(public payload: any) {}
        }
      };
      hostFixture.detectChanges();
      component = hostFixture.debugElement.children[0].componentInstance;
      mockCcdComponent = hostFixture.debugElement.children[0].children[0].componentInstance;
    });

    it('should set up event subscriptions when ccdComponent exists', () => {
      expect((component.subscriptions as any).submitted).toBeDefined();
      expect((component.subscriptions as any).cancelled).toBeDefined();
    });

    it('should create dispatchers when ccdComponent exists', () => {
      expect(component.dispatcherContainer).toBeDefined();
      expect((component.dispatcherContainer as any).submitted).toBeDefined();
      expect((component.dispatcherContainer as any).cancelled).toBeDefined();
    });

    it('should set hostBindingValue when ccdComponent exists', () => {
      expect(component.hostBindingValue).toBe('CCD-TEST-COMPONENT');
    });

    it('should dispatch action when event is emitted', () => {
      const testData = { caseId: '123', data: { field: 'value' } };
      mockCcdComponent.submitted.emit(testData);

      expect(mockStore.dispatch).toHaveBeenCalled();
      const dispatchedAction = mockStore.dispatch.calls.mostRecent().args[0] as any;
      expect(dispatchedAction.constructor.name).toBe('ApplyChange');
      expect(dispatchedAction.payload).toEqual(testData);
    });

    it('should handle multiple event emissions', () => {
      const submittedData = { caseId: '123' };
      const cancelledData = { reason: 'user cancelled' };

      mockCcdComponent.submitted.emit(submittedData);
      mockCcdComponent.cancelled.emit(cancelledData);

      expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe('ngAfterContentInit without ccdComponent', () => {
    it('should not set up subscriptions when ccdComponent is missing', () => {
      component.ccdComponent = null;
      component.ngAfterContentInit();

      expect(component.subscriptions).toEqual([]);
      expect(component.dispatcherContainer).toBeUndefined();
      expect(component.hostBindingValue).toBeUndefined();
    });
  });

  describe('createDispatchers', () => {
    it('should create dispatcher functions for each event binding', () => {
      component.createDispatchers();

      expect(component.dispatcherContainer).toBeDefined();
      expect(typeof (component.dispatcherContainer as any).cancelled).toBe('function');
      expect(typeof (component.dispatcherContainer as any).submitted).toBe('function');
    });

    it('should dispatch correct action when dispatcher is called', () => {
      component.createDispatchers();
      const testPayload = { test: 'data' };

      (component.dispatcherContainer as any).submitted(testPayload);

      expect(mockStore.dispatch).toHaveBeenCalled();
      const dispatchedAction = mockStore.dispatch.calls.mostRecent().args[0] as any;
      expect(dispatchedAction.constructor.name).toBe('ApplyChange');
      expect(dispatchedAction.payload).toEqual(testPayload);
    });

    it('should handle empty eventsBindings array', () => {
      component.eventsBindings = [];
      component.createDispatchers();

      expect(component.dispatcherContainer).toEqual({});
    });
  });

  describe('deepClone', () => {
    it('should create a deep copy of an object', () => {
      const original = { a: 1, b: { c: 2 } };
      const cloned = component.deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
    });

    it('should handle objects with formGroup property', () => {
      const original = {
        formGroup: { value: 'test', other: 'prop' },
        normalProp: 'value'
      };
      const cloned = component.deepClone(original);

      expect(cloned.formGroup).toEqual({ value: 'test' });
      expect(cloned.normalProp).toBe('value');
    });

    it('should handle objects with null properties', () => {
      const original = { a: null, b: undefined, c: 'value' };
      const cloned = component.deepClone(original);

      // JSON.parse/stringify removes undefined properties
      expect(cloned).toEqual({ a: null, c: 'value' });
      expect(cloned).not.toBe(original);
    });

    it('should handle arrays', () => {
      const original = [1, 2, { a: 3 }];
      const cloned = component.deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
    });
  });

  describe('simplifyFormGroup with complex objects', () => {
    it('should simplify nested formGroup properties', () => {
      const obj = {
        level1: {
          formGroup: { value: 'nested', extra: 'prop' },
          level2: {
            formGroup: { value: 'deeper', another: 'prop' }
          }
        }
      };

      const result = component.simplifyFormGroup(obj);

      expect(result.level1.formGroup).toEqual({ value: 'nested' });
      expect(result.level1.level2.formGroup).toEqual({ value: 'deeper' });
    });

    it('should handle objects without formGroup property', () => {
      const obj = { a: 1, b: { c: 2 } };
      const result = component.simplifyFormGroup(obj);

      expect(result).toEqual(obj);
    });

    it('should handle formGroup with undefined value', () => {
      const obj = {
        formGroup: { value: undefined, other: 'prop' }
      };

      const result = component.simplifyFormGroup(obj);

      expect(result.formGroup).toEqual({ value: undefined });
    });

    it('should handle circular references by throwing during JSON.stringify', () => {
      const obj: any = { a: 1 };
      obj.circular = obj;

      expect(() => component.deepClone(obj)).toThrow();
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostComponent.store = mockStore;
      hostComponent.eventsBindings = [
        { type: 'submitted', action: 'ApplyChange' },
        { type: 'cancelled', action: 'CreateCaseReset' }
      ];
      hostComponent.fromFeatureStore = {
        CreateCaseReset: class {
          constructor(public payload: any) {}
        },
        ApplyChange: class {
          constructor(public payload: any) {}
        }
      };
      hostFixture.detectChanges();
      component = hostFixture.debugElement.children[0].componentInstance;
    });

    it('should unsubscribe from all subscriptions', () => {
      const unsubscribeSpy1 = jasmine.createSpy('unsubscribe');
      const unsubscribeSpy2 = jasmine.createSpy('unsubscribe');

      component.subscriptions = [];
      (component.subscriptions as any).submitted = { unsubscribe: unsubscribeSpy1 };
      (component.subscriptions as any).cancelled = { unsubscribe: unsubscribeSpy2 };
      component.subscriptions.length = 2; // Make the array-like object pass the length check

      component.ngOnDestroy();

      expect(unsubscribeSpy1).toHaveBeenCalled();
      expect(unsubscribeSpy2).toHaveBeenCalled();
    });

    it('should handle empty subscriptions array', () => {
      component.subscriptions = [];
      component.subscriptions.length = 0;

      expect(() => component.ngOnDestroy()).not.toThrow();
    });

    it('should handle missing subscriptions for some event types', () => {
      const unsubscribeSpy = jasmine.createSpy('unsubscribe');
      component.subscriptions = [];
      (component.subscriptions as any).submitted = { unsubscribe: unsubscribeSpy };
      component.subscriptions.length = 1;
      // Override eventsBindings to only include 'submitted' event
      component.eventsBindings = [{ type: 'submitted', action: 'ApplyChange' }];

      component.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle dispatcher being called with no arguments', () => {
      component.createDispatchers();

      (component.dispatcherContainer as any).submitted({});

      expect(mockStore.dispatch).toHaveBeenCalled();
    });

    it('should handle null eventsBindings', () => {
      component.eventsBindings = null;

      expect(() => component.createDispatchers()).toThrow();
    });

    it('should handle undefined fromFeatureStore actions', () => {
      component.fromFeatureStore = {};
      component.createDispatchers();

      expect(() => (component.dispatcherContainer as any).submitted({})).toThrowError(TypeError);
    });

    it('should handle store dispatch errors', () => {
      mockStore.dispatch.and.throwError('Dispatch error');
      component.createDispatchers();

      expect(() => (component.dispatcherContainer as any).submitted({})).toThrowError();
    });
  });
});
