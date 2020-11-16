import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { UtilsModule } from '../utils/utils.module';
import { NocPhoneUkFieldComponent } from './noc-phone-uk-field.component';

describe('NocPhoneUkFieldComponent', () => {
  const FORM_GROUP: FormGroup = new FormGroup({});
  const REGISTER_CONTROL = (control) => {
    FORM_GROUP.addControl('Email', control);
    return control;
  };
  const QUESTION_FIELD = {
    case_type_id: 'AAT',
    order: '3',
    question_text: 'What is your Phone number',
    answer_field_type: {
      id: 'PhoneUK',
      type: 'PhoneUK',
      min: null,
      max: null,
      regular_expression: null,
      fixed_list_items: [],
      complex_fields: [],
      collection_field_type: null
    },
    display_context_parameter: '3',
    challenge_question_id: 'NoC',
    answer_field: '',
    question_id: 'question3',
  };
  const ANSWER_VALUE = of('07777777777');
  let component: NocPhoneUkFieldComponent;
  let fixture: ComponentFixture<NocPhoneUkFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        NocPhoneUkFieldComponent,
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
    fixture = TestBed.createComponent(NocPhoneUkFieldComponent);
    component = fixture.componentInstance;
    component.formGroup = FORM_GROUP;
    component.registerControl = REGISTER_CONTROL;
    component.answerValue$ = ANSWER_VALUE;
    // @ts-ignore
    component.questionField = QUESTION_FIELD;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
