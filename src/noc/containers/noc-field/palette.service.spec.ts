import { TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { PaletteService } from './palette.service';
import { NocQuestion } from '../../models';
import { NocDateFieldComponent } from './date';
import { NocDateTimeFieldComponent } from './datetime';
import { NocEmailFieldComponent } from './email';
import { NocNumberFieldComponent } from './number';
import { NocPhoneUkFieldComponent } from './phone-uk';
import { NocPostcodeFieldComponent } from './postcode';
import { NocTextFieldComponent } from './text';
import { NocTimeFieldComponent } from './time';
import { NocYesNoFieldComponent } from './yes-no';

describe('PaletteService', () => {
  let service: PaletteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaletteService]
    });
    service = TestBed.inject(PaletteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service).toBeInstanceOf(PaletteService);
  });

  describe('getFieldComponentClass', () => {
    const createMockQuestion = (type: string): NocQuestion => {
      return {
        case_type_id: 'test_case_type',
        order: '1',
        question_text: 'Test question',
        answer_field_type: {
          id: 'test_id',
          type: type,
          min: null,
          max: null,
          regular_expression: null,
          fixed_list_items: [],
          complex_fields: [],
          collection_field_type: null
        },
        display_context_parameter: 'test_context',
        challenge_question_id: 'test_challenge',
        answer_field: 'test_answer',
        question_id: 'test_question_id'
      } as NocQuestion;
    };

    it('should return NocTextFieldComponent for Text type', () => {
      const mockQuestion = createMockQuestion('Text');

      const result = service.getFieldComponentClass(mockQuestion);

      expect(result).toBe(NocTextFieldComponent);
    });

    it('should return NocNumberFieldComponent for Number type', () => {
      const mockQuestion = createMockQuestion('Number');

      const result = service.getFieldComponentClass(mockQuestion);

      expect(result).toBe(NocNumberFieldComponent);
    });

    it('should return NocEmailFieldComponent for Email type', () => {
      const mockQuestion = createMockQuestion('Email');

      const result = service.getFieldComponentClass(mockQuestion);

      expect(result).toBe(NocEmailFieldComponent);
    });

    it('should return NocPhoneUkFieldComponent for PhoneUK type', () => {
      const mockQuestion = createMockQuestion('PhoneUK');

      const result = service.getFieldComponentClass(mockQuestion);

      expect(result).toBe(NocPhoneUkFieldComponent);
    });

    it('should return NocYesNoFieldComponent for YesOrNo type', () => {
      const mockQuestion = createMockQuestion('YesOrNo');

      const result = service.getFieldComponentClass(mockQuestion);

      expect(result).toBe(NocYesNoFieldComponent);
    });

    it('should return NocPostcodeFieldComponent for Postcode type', () => {
      const mockQuestion = createMockQuestion('Postcode');

      const result = service.getFieldComponentClass(mockQuestion);

      expect(result).toBe(NocPostcodeFieldComponent);
    });

    it('should return NocDateFieldComponent for Date type', () => {
      const mockQuestion = createMockQuestion('Date');

      const result = service.getFieldComponentClass(mockQuestion);

      expect(result).toBe(NocDateFieldComponent);
    });

    it('should return NocDateTimeFieldComponent for DateTime type', () => {
      const mockQuestion = createMockQuestion('DateTime');

      const result = service.getFieldComponentClass(mockQuestion);

      expect(result).toBe(NocDateTimeFieldComponent);
    });

    it('should return NocTimeFieldComponent for Time type', () => {
      const mockQuestion = createMockQuestion('Time');

      const result = service.getFieldComponentClass(mockQuestion);

      expect(result).toBe(NocTimeFieldComponent);
    });

    it('should return NocTextFieldComponent for unknown type as default', () => {
      const mockQuestion = createMockQuestion('UnknownType');

      const result = service.getFieldComponentClass(mockQuestion);

      expect(result).toBe(NocTextFieldComponent);
    });

    it('should return NocTextFieldComponent for empty string type', () => {
      const mockQuestion = createMockQuestion('');

      const result = service.getFieldComponentClass(mockQuestion);

      expect(result).toBe(NocTextFieldComponent);
    });

    it('should return NocTextFieldComponent for null type', () => {
      const mockQuestion = createMockQuestion(null as any);

      const result = service.getFieldComponentClass(mockQuestion);

      expect(result).toBe(NocTextFieldComponent);
    });

    it('should return NocTextFieldComponent for undefined type', () => {
      const mockQuestion = createMockQuestion(undefined as any);

      const result = service.getFieldComponentClass(mockQuestion);

      expect(result).toBe(NocTextFieldComponent);
    });

    it('should handle case-sensitive type matching', () => {
      const mockQuestion = createMockQuestion('text');

      const result = service.getFieldComponentClass(mockQuestion);

      expect(result).toBe(NocTextFieldComponent);
    });

    it('should return correct component type', () => {
      const mockQuestion = createMockQuestion('Email');

      const result = service.getFieldComponentClass(mockQuestion);

      expect(result).toBeTruthy();
      expect(result).toEqual(jasmine.any(Function));
      expect(result.name).toBe('NocEmailFieldComponent');
    });

    it('should handle questions with additional properties', () => {
      const mockQuestion: NocQuestion = {
        case_type_id: 'test_case_type',
        order: '1',
        question_text: 'Test question',
        answer_field_type: {
          id: 'test_id',
          type: 'Number',
          min: 0,
          max: 100,
          regular_expression: null,
          fixed_list_items: [],
          complex_fields: [],
          collection_field_type: null
        },
        display_context_parameter: 'MANDATORY',
        challenge_question_id: 'test_challenge',
        answer_field: 'test_answer',
        question_id: 'field123'
      };

      const result = service.getFieldComponentClass(mockQuestion);

      expect(result).toBe(NocNumberFieldComponent);
    });

    it('should handle all defined field types', () => {
      const fieldTypeMappings: { [key: string]: Type<unknown> } = {
        'Text': NocTextFieldComponent,
        'Number': NocNumberFieldComponent,
        'Email': NocEmailFieldComponent,
        'PhoneUK': NocPhoneUkFieldComponent,
        'YesOrNo': NocYesNoFieldComponent,
        'Postcode': NocPostcodeFieldComponent,
        'Date': NocDateFieldComponent,
        'DateTime': NocDateTimeFieldComponent,
        'Time': NocTimeFieldComponent
      };

      Object.entries(fieldTypeMappings).forEach(([type, expectedComponent]) => {
        const mockQuestion = createMockQuestion(type);

        const result = service.getFieldComponentClass(mockQuestion);
        expect(result).toBe(expectedComponent);
      });
    });
  });
});
