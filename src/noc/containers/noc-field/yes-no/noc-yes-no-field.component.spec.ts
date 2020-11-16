import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { UtilsModule } from '../utils/utils.module';
import { NocYesNoFieldComponent } from './noc-yes-no-field.component';
import { YesNoService } from './yes-no.service';

describe('NocYesNoFieldComponent', () => {
  const FORM_GROUP: FormGroup = new FormGroup({});
  const REGISTER_CONTROL = (control) => {
    FORM_GROUP.addControl('Email', control);
    return control;
  };
  const QUESTION_FIELD = {
    case_type_id: 'AAT',
    order: '6',
    question_text: 'Did you enter your number, yes or no',
    answer_field_type: {
      id: 'YesOrNo',
      type: 'YesOrNo',
      min: null,
      max: null,
      regular_expression: null,
      fixed_list_items: [],
      complex_fields: [],
      collection_field_type: null
    },
    display_context_parameter: '6',
    challenge_question_id: 'NoC',
    answer_field: '',
    question_id: 'question6',
  };
  const ANSWER_VALUE = of('Yes');
  let component: NocYesNoFieldComponent;
  let fixture: ComponentFixture<NocYesNoFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        NocYesNoFieldComponent,
      ],
      imports: [
        ReactiveFormsModule,
        UtilsModule
      ],
      providers: [
        provideMockStore(),
        YesNoService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocYesNoFieldComponent);
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
