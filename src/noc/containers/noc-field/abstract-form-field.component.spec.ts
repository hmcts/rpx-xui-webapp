import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { NocQuestion } from '../../models';
import { AbstractFormFieldComponent } from './abstract-form-field.component';

// Define a test-specific implementation of the abstract component
@Component({
  standalone: false,

  template: ''
})
class TestFormFieldComponent extends AbstractFormFieldComponent {
  public addValidators(questionField: NocQuestion, control: FormControl): void {
    super.addValidators(questionField, control);
  }
}

describe('AbstractFormFieldComponent', () => {
  let component: TestFormFieldComponent;
  let fixture: ComponentFixture<TestFormFieldComponent>;
  let mockFormGroup: FormGroup;
  let mockQuestionField: NocQuestion;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestFormFieldComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormFieldComponent);
    component = fixture.componentInstance;

    // Initialize mock data
    mockFormGroup = new FormGroup({});
    mockQuestionField = {
      case_type_id: 'test-case-type',
      order: '1',
      question_text: 'Test Question',
      answer_field_type: {
        id: 'text',
        type: 'Text',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null
      },
      display_context_parameter: 'test-context',
      challenge_question_id: 'challenge-id',
      answer_field: 'test-answer-field',
      question_id: 'test-question-id'
    } as NocQuestion;

    component.questionField = mockQuestionField;
    component.formGroup = mockFormGroup;

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeInstanceOf(TestFormFieldComponent);
      expect(component.answerValue).toBeDefined();
    });

    it('should initialize with default answerValue as empty string', () => {
      expect(component.answerValue).toBe('');
    });

    it('should accept questionField input', () => {
      expect(component.questionField).toEqual(mockQuestionField);
    });

    it('should accept formGroup input', () => {
      expect(component.formGroup).toBe(mockFormGroup);
    });

    it('should accept answerValue$ observable input', () => {
      const mockObservable = of('test-value');
      component.answerValue$ = mockObservable;
      expect(component.answerValue$).toBe(mockObservable);
    });

    it('should accept registerControl function input', () => {
      const mockRegisterControl = <T extends AbstractControl>(control: T): T => control;
      component.registerControl = mockRegisterControl;
      expect(component.registerControl).toBe(mockRegisterControl);
    });
  });

  describe('defaultControlRegister', () => {
    let mockFormControl: FormControl;

    beforeEach(() => {
      mockFormControl = new FormControl('');
    });

    it('should return null when formGroup is not provided', () => {
      component.formGroup = undefined;
      const registerFn = (component as any).defaultControlRegister();
      const result = registerFn(mockFormControl);

      expect(result).toBeNull();
    });

    it('should return existing control if it already exists in formGroup', () => {
      const existingControl = new FormControl('existing-value');
      mockFormGroup.addControl(mockQuestionField.question_id, existingControl);

      const registerFn = (component as any).defaultControlRegister();
      const result = registerFn(mockFormControl);

      expect(result).toBe(existingControl);
      expect(result).not.toBe(mockFormControl);
    });

    it('should add new control to formGroup if it does not exist', () => {
      const registerFn = (component as any).defaultControlRegister();
      const result = registerFn(mockFormControl);

      expect(result).toBe(mockFormControl);
      expect(mockFormGroup.contains(mockQuestionField.question_id)).toBe(true);
      expect(mockFormGroup.get(mockQuestionField.question_id)).toBe(mockFormControl);
    });

    it('should call addValidators when adding new control', () => {
      spyOn(component, 'addValidators');

      const registerFn = (component as any).defaultControlRegister();
      registerFn(mockFormControl);

      expect(component.addValidators).toHaveBeenCalledWith(mockQuestionField, mockFormControl);
    });

    it('should not call addValidators when returning existing control', () => {
      const existingControl = new FormControl('existing-value');
      mockFormGroup.addControl(mockQuestionField.question_id, existingControl);
      spyOn(component, 'addValidators');

      const registerFn = (component as any).defaultControlRegister();
      registerFn(mockFormControl);

      expect(component.addValidators).not.toHaveBeenCalled();
    });

    it('should handle null formGroup without errors', () => {
      component.formGroup = null;
      const registerFn = (component as any).defaultControlRegister();

      expect(() => registerFn(mockFormControl)).not.toThrow();
      expect(registerFn(mockFormControl)).toBeNull();
    });

    it('should work with different control types', () => {
      const customControl = new FormControl('', Validators.required);
      const registerFn = (component as any).defaultControlRegister();
      const result = registerFn(customControl);

      expect(result).toBe(customControl);
      expect(mockFormGroup.get(mockQuestionField.question_id)).toBe(customControl);
    });
  });

  describe('addValidators', () => {
    it('should be called but not add validators by default', () => {
      const control = new FormControl('');
      const initialValidators = control.validator;

      component.addValidators(mockQuestionField, control);

      expect(control.validator).toBe(initialValidators);
    });

    it('should be overrideable by child classes', () => {
      // This test ensures the method can be overridden
      class TestComponentWithValidators extends AbstractFormFieldComponent {
        protected addValidators(questionField: NocQuestion, control: FormControl): void {
          // Add validation based on answer_field_type
          if (questionField.answer_field_type.type === 'Text' && questionField.answer_field_type.min) {
            control.setValidators(Validators.minLength(questionField.answer_field_type.min));
          }
        }
      }

      const testComponent: any = new TestComponentWithValidators();
      const control = new FormControl('');
      const questionWithMin = {
        ...mockQuestionField,
        answer_field_type: {
          ...mockQuestionField.answer_field_type,
          min: 5
        }
      };
      testComponent.questionField = questionWithMin;

      testComponent.addValidators(questionWithMin, control);

      control.setValue('abc');
      expect(control.hasError('minlength')).toBe(true);
    });
  });

  describe('setAnswer', () => {
    it('should subscribe to answerValue$ and update answerValue', () => {
      const testValue = 'test-answer-value';
      component.answerValue$ = of(testValue);

      (component as any).setAnswer();

      expect(component.answerValue).toBe(testValue);
    });

    it('should handle multiple emissions from answerValue$', () => {
      const values = ['first', 'second', 'third'];
      const emitIndex = 0;

      component.answerValue$ = new Observable((subscriber) => {
        values.forEach((value) => subscriber.next(value));
        subscriber.complete();
      });

      (component as any).setAnswer();

      expect(component.answerValue).toBe('third');
    });

    it('should handle empty string values', () => {
      component.answerValue$ = of('');

      (component as any).setAnswer();

      expect(component.answerValue).toBe('');
    });

    it('should handle null values', () => {
      component.answerValue$ = of(null);

      (component as any).setAnswer();

      expect(component.answerValue).toBeNull();
    });

    it('should handle undefined values', () => {
      component.answerValue$ = of(undefined);

      (component as any).setAnswer();

      expect(component.answerValue).toBeUndefined();
    });

    it('should throw error when answerValue$ is undefined', () => {
      component.answerValue$ = undefined;

      expect(() => (component as any).setAnswer()).toThrow();
    });

    it('should update answerValue for each emission', (done) => {
      const values = ['a', 'b', 'c'];
      let currentIndex = 0;

      component.answerValue$ = new Observable((subscriber) => {
        const interval = setInterval(() => {
          if (currentIndex < values.length) {
            subscriber.next(values[currentIndex]);
            currentIndex++;
          } else {
            clearInterval(interval);
            subscriber.complete();
          }
        }, 10);
      });

      (component as any).setAnswer();

      // Wait for all emissions
      setTimeout(() => {
        expect(component.answerValue).toBe('c');
        done();
      }, 50);
    });
  });

  describe('Component Extension', () => {
    it('should allow child components to extend functionality', () => {
      class ExtendedComponent extends AbstractFormFieldComponent {
        public customMethod(): string {
          return `Question: ${this.questionField?.question_text}`;
        }
      }

      const extended = new ExtendedComponent();
      extended.questionField = mockQuestionField;

      expect(extended.customMethod()).toBe('Question: Test Question');
    });

    it('should inherit all properties and methods', () => {
      // Required properties should be defined after setup
      expect(component.questionField).toBeDefined();
      expect(component.formGroup).toBeDefined();
      expect(component.answerValue).toBeDefined();

      // Protected methods should exist
      expect((component as any).defaultControlRegister).toBeDefined();
      expect((component as any).addValidators).toBeDefined();
      expect((component as any).setAnswer).toBeDefined();

      // Optional properties should be accessible (even if undefined)
      component.answerValue$ = of('test');
      expect((component as any).answerValue$).toBeDefined();

      const testControl = <T extends AbstractControl>(control: T): T => control;
      component.registerControl = testControl;
      expect(component.registerControl).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle questionField with special characters in question_id', () => {
      component.questionField = {
        ...mockQuestionField,
        question_id: 'question-id-with-special-chars!@#$%'
      };

      const control = new FormControl('');
      const registerFn = (component as any).defaultControlRegister();
      const result = registerFn(control);

      expect(result).toBe(control);
      expect(mockFormGroup.contains('question-id-with-special-chars!@#$%')).toBe(true);
    });

    it('should handle very long question_id', () => {
      const longId = 'a'.repeat(1000);
      component.questionField = {
        ...mockQuestionField,
        question_id: longId
      };

      const control = new FormControl('');
      const registerFn = (component as any).defaultControlRegister();
      const result = registerFn(control);

      expect(result).toBe(control);
      expect(mockFormGroup.contains(longId)).toBe(true);
    });

    it('should handle empty question_id', () => {
      component.questionField = {
        ...mockQuestionField,
        question_id: ''
      };

      const control = new FormControl('');
      const registerFn = (component as any).defaultControlRegister();
      const result = registerFn(control);

      expect(result).toBe(control);
      expect(mockFormGroup.contains('')).toBe(true);
    });
  });
});
