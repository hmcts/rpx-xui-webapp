import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { UtilsModule } from '../utils/utils.module';
import { NocNumberFieldComponent } from './noc-number-field.component';

describe('NocNumberFieldComponent', () => {
  const FORM_GROUP: FormGroup = new FormGroup({});
  const REGISTER_CONTROL = (control) => {
    FORM_GROUP.addControl('Email', control);
    return control;
  };
  const QUESTION_FIELD = {
    case_type_id: 'AAT',
    order: '2',
    question_text: 'How many children do they have?',
    answer_field_type: {
      id: 'Number',
      type: 'Number',
      min: null,
      max: null,
      regular_expression: null,
      fixed_list_items: [],
      complex_fields: [],
      collection_field_type: null
    },
    display_context_parameter: '2',
    challenge_question_id: 'NoC',
    answer_field: '',
    question_id: 'question2',
  };
  let component: NocNumberFieldComponent;
  let fixture: ComponentFixture<NocNumberFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        NocNumberFieldComponent,
      ],
      imports: [
        ReactiveFormsModule,
        UtilsModule
      ],
      providers: [
        provideMockStore()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocNumberFieldComponent);
    component = fixture.componentInstance;
    component.formGroup = FORM_GROUP;
    component.registerControl = REGISTER_CONTROL;
    // @ts-ignore
    component.questionField = QUESTION_FIELD;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
