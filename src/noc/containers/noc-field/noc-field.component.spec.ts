import { Component, ComponentRef, Injector, NO_ERRORS_SCHEMA, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NocQuestion } from '../../models';
import { FormValidatorsService } from './form-validators.service';
import { NocFieldComponent } from './noc-field.component';
import { PaletteService } from './palette.service';
import { NocTextFieldComponent } from './text';
import { NocNumberFieldComponent } from './number';
import { NocEmailFieldComponent } from './email';
import { NocDateFieldComponent } from './date';
import { NocYesNoFieldComponent } from './yes-no';

@Component({
  standalone: false,
  selector: 'exui-test-component',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<div>Test Component</div>',
})
class TestComponent {
  public questionField: NocQuestion;
  public answerValue$: any;
  public formGroup: FormGroup;
  public registerControl: any;
  public idPrefix: string;
}

describe('NocFieldComponent', () => {
  let component: NocFieldComponent;
  let fixture: ComponentFixture<NocFieldComponent>;
  let mockPaletteService: jasmine.SpyObj<PaletteService>;
  let mockFormValidatorsService: jasmine.SpyObj<FormValidatorsService>;
  let mockViewContainerRef: jasmine.SpyObj<ViewContainerRef>;
  let mockInjector: jasmine.SpyObj<Injector>;

  const mockNocQuestion: NocQuestion = {
    case_type_id: 'test-case-type',
    order: '1',
    question_text: 'Test Question',
    answer_field_type: {
      id: 'test-field',
      type: 'Text',
      min: null,
      max: null,
      regular_expression: null,
      fixed_list_items: [],
      complex_fields: [],
      collection_field_type: null,
    },
    display_context_parameter: 'MANDATORY',
    challenge_question_id: 'test-challenge',
    answer_field: 'test-answer',
    question_id: 'test-question-id',
  };

  beforeEach(waitForAsync(() => {
    mockPaletteService = jasmine.createSpyObj('PaletteService', ['getFieldComponentClass']);
    mockFormValidatorsService = jasmine.createSpyObj('FormValidatorsService', ['addValidators']);
    mockViewContainerRef = jasmine.createSpyObj('ViewContainerRef', ['createComponent']);
    mockInjector = jasmine.createSpyObj('Injector', ['get']);
    (mockInjector as any).destroy = jasmine.createSpy('destroy');

    TestBed.configureTestingModule({
      declarations: [NocFieldComponent, TestComponent],
      providers: [
        { provide: PaletteService, useValue: mockPaletteService },
        { provide: FormValidatorsService, useValue: mockFormValidatorsService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocFieldComponent);
    component = fixture.componentInstance;
    component.fieldContainer = mockViewContainerRef;
    component.questionField = mockNocQuestion;
    component.formGroup = new FormGroup({});
    component.answerValue$ = of('test-answer');
    component.idPrefix = 'prefix-';

    // Define parentInjector on mock
    Object.defineProperty(mockViewContainerRef, 'parentInjector', {
      get: () => mockInjector,
      configurable: true,
    });
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.questionField).toEqual(jasmine.objectContaining(mockNocQuestion));
    });

    it('should have correct template structure', () => {
      mockPaletteService.getFieldComponentClass.and.returnValue(TestComponent);

      fixture.detectChanges();

      const containerElement = fixture.debugElement.query(By.css('div'));
      expect(containerElement).toBeTruthy();

      expect(containerElement.nativeElement.textContent).toContain('Test Component');
    });

    it('should inherit from AbstractFieldWriteComponent', () => {
      expect(component.id).toBeDefined();
      expect((component as any).defaultControlRegister).toBeDefined();
    });
  });

  describe('addValidators', () => {
    it('should call formValidatorsService.addValidators', () => {
      const control = new FormControl();
      (component as any).addValidators(mockNocQuestion, control);

      expect(mockFormValidatorsService.addValidators).toHaveBeenCalledWith(mockNocQuestion, control);
    });
  });

  describe('ngAfterViewInit', () => {
    let mockComponentRef: ComponentRef<any>;
    let mockComponentInstance: any;

    beforeEach(() => {
      mockComponentInstance = {};

      mockComponentRef = {
        instance: mockComponentInstance,
        hostView: {},
        location: null,
        injector: null,
        changeDetectorRef: null,
        destroy: jasmine.createSpy('destroy'),
        onDestroy: jasmine.createSpy('onDestroy'),
      } as any;

      mockViewContainerRef.createComponent.and.returnValue(mockComponentRef);
      mockPaletteService.getFieldComponentClass.and.returnValue(TestComponent);

      // Mock Injector.create as a static method
      spyOn(Injector, 'create').and.returnValue(mockInjector as any);
    });

    it('should create component based on field type', () => {
      component.ngAfterViewInit();

      expect(mockPaletteService.getFieldComponentClass).toHaveBeenCalledWith(mockNocQuestion);
      expect(mockViewContainerRef.createComponent).toHaveBeenCalledWith(TestComponent, { injector: mockInjector });
    });

    it('should create injector with correct parent', () => {
      component.ngAfterViewInit();

      expect(Injector.create).toHaveBeenCalledWith({
        providers: [],
        parent: mockInjector,
      });
    });

    it('should create component with injector', () => {
      component.ngAfterViewInit();

      expect(mockViewContainerRef.createComponent).toHaveBeenCalledWith(TestComponent, { injector: mockInjector });
    });

    it('should set all required inputs on created component', () => {
      component.ngAfterViewInit();

      expect(mockComponentInstance.questionField).toBeTruthy();
      expect(mockComponentInstance.questionField.question_id).toBe(mockNocQuestion.question_id);
      expect(mockComponentInstance.answerValue$).toBe(component.answerValue$);
      expect(mockComponentInstance.formGroup).toBe(component.formGroup);
      expect(mockComponentInstance.registerControl).toBeTruthy();
      expect(mockComponentInstance.idPrefix).toBe(component.idPrefix);
    });

    it('should use defaultControlRegister when registerControl is not provided', () => {
      component.registerControl = undefined;
      component.ngAfterViewInit();

      expect(mockComponentInstance.registerControl).toBeTruthy();
      expect(typeof mockComponentInstance.registerControl).toBe('function');
    });

    it('should use provided registerControl when available', () => {
      const customRegisterControl = jasmine.createSpy('customRegisterControl');
      component.registerControl = customRegisterControl;
      component.ngAfterViewInit();

      expect(mockComponentInstance.registerControl).toBe(customRegisterControl);
    });

    it('should insert component view into container', () => {
      component.ngAfterViewInit();

      expect(mockViewContainerRef.createComponent).toHaveBeenCalledWith(TestComponent, { injector: mockInjector });
    });

    describe('Different Field Types', () => {
      const fieldTypes = [
        { type: 'Text', component: NocTextFieldComponent },
        { type: 'Number', component: NocNumberFieldComponent },
        { type: 'Email', component: NocEmailFieldComponent },
        { type: 'Date', component: NocDateFieldComponent },
        { type: 'YesOrNo', component: NocYesNoFieldComponent },
      ];

      fieldTypes.forEach(({ type, component: expectedComponent }) => {
        it(`should create correct component for ${type} field type`, () => {
          component.questionField.answer_field_type.type = type;
          mockPaletteService.getFieldComponentClass.and.returnValue(expectedComponent);

          component.ngAfterViewInit();

          expect(mockPaletteService.getFieldComponentClass).toHaveBeenCalledWith(component.questionField);
          expect(mockViewContainerRef.createComponent).toHaveBeenCalledWith(expectedComponent, { injector: mockInjector });
        });
      });
    });

    it('should handle null questionField gracefully', () => {
      component.questionField = null;
      mockPaletteService.getFieldComponentClass.and.returnValue(TestComponent);

      expect(() => component.ngAfterViewInit()).not.toThrow();
    });

    it('should handle undefined answerValue$', () => {
      component.answerValue$ = undefined;

      component.ngAfterViewInit();

      expect(mockComponentInstance.answerValue$).toBeUndefined();
    });

    it('should handle undefined formGroup', () => {
      component.formGroup = undefined;

      component.ngAfterViewInit();

      expect(mockComponentInstance.formGroup).toBeUndefined();
    });

    it('should handle empty idPrefix', () => {
      component.idPrefix = '';

      component.ngAfterViewInit();

      expect(mockComponentInstance.idPrefix).toBe('');
    });

    it('should transform questionField using plainToClassFromExist', () => {
      component.ngAfterViewInit();

      const transformedQuestion = mockComponentInstance.questionField;
      expect(transformedQuestion).toBeTruthy();
      expect(transformedQuestion.constructor.name).toBe('NocQuestion');
      expect(transformedQuestion.question_id).toBe(mockNocQuestion.question_id);
    });
  });

  describe('ViewChild fieldContainer', () => {
    it('should have fieldContainer property defined', () => {
      expect(component.fieldContainer).toBeDefined();
      expect(component.fieldContainer).toBe(mockViewContainerRef);
    });
  });

  describe('Edge Cases and Error Scenarios', () => {
    beforeEach(() => {
      const mockComponentInstance = {};
      const mockComponentRef = {
        instance: mockComponentInstance,
        hostView: {},
      } as any;

      mockViewContainerRef.createComponent.and.returnValue(mockComponentRef);
      mockPaletteService.getFieldComponentClass.and.returnValue(TestComponent);
      spyOn(Injector, 'create').and.returnValue(mockInjector as any);
    });

    it('should handle complex questionField with all properties', () => {
      const complexQuestion: NocQuestion = {
        ...mockNocQuestion,
        answer_field_type: {
          ...mockNocQuestion.answer_field_type,
          min: 0,
          max: 100,
          regular_expression: '^[A-Z]+$',
          fixed_list_items: [],
          complex_fields: [],
          collection_field_type: { id: 'collection', type: 'Complex' },
        },
      };

      component.questionField = complexQuestion;

      expect(() => component.ngAfterViewInit()).not.toThrow();
    });

    it('should handle formGroup with existing controls', () => {
      const existingControl = new FormControl('existing-value');
      component.formGroup.addControl('existing-control', existingControl);

      component.ngAfterViewInit();

      expect(component.formGroup.contains('existing-control')).toBe(true);
    });

    it('should handle all falsy values for inputs', () => {
      component.answerValue$ = null;
      component.formGroup = null;
      component.registerControl = null;
      component.idPrefix = null;

      expect(() => component.ngAfterViewInit()).not.toThrow();
    });
  });

  describe('Integration with Parent Classes', () => {
    it('should correctly implement id() method from parent', () => {
      component.idPrefix = 'test-prefix-';
      component.questionField = mockNocQuestion;

      expect(component.id()).toBe('test-prefix-test-question-id');
    });

    it('should have access to defaultControlRegister from AbstractFormFieldComponent', () => {
      const registerFn = (component as any).defaultControlRegister();
      expect(typeof registerFn).toBe('function');
    });

    it('should handle defaultControlRegister with no formGroup', () => {
      component.formGroup = null;
      const registerFn = (component as any).defaultControlRegister();
      const control = new FormControl();

      const result = registerFn(control);

      expect(result).toBeNull();
    });

    it('should handle defaultControlRegister with existing control', () => {
      const existingControl = new FormControl('existing');
      component.formGroup.addControl(mockNocQuestion.question_id, existingControl);

      const registerFn = (component as any).defaultControlRegister();
      const newControl = new FormControl();

      const result = registerFn(newControl);

      expect(result).toBe(existingControl);
      expect(mockFormValidatorsService.addValidators).not.toHaveBeenCalled();
    });

    it('should handle defaultControlRegister with new control', () => {
      const registerFn = (component as any).defaultControlRegister();
      const newControl = new FormControl();

      spyOn<any>(component, 'addValidators');

      const result = registerFn(newControl);

      expect(result).toBe(newControl);
      expect((component as any).addValidators).toHaveBeenCalledWith(mockNocQuestion, newControl);
      expect(component.formGroup.contains(mockNocQuestion.question_id)).toBe(true);
    });
  });
});
