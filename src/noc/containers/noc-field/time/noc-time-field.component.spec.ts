import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { UtilsModule } from '../utils/utils.module';
import { NocTimeFieldComponent } from './noc-time-field.component';

@Pipe({ name: 'rpxTranslate' })
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('NocTimeFieldComponent', () => {
  const FORM_GROUP: FormGroup = new FormGroup({});
  const REGISTER_CONTROL = (control) => {
    FORM_GROUP.addControl('Time', control);
    return control;
  };
  const QUESTION_FIELD = {
    case_type_id: 'AAT',
    order: '2',
    question_text: 'What is the current time?',
    answer_field_type: {
      id: 'Time',
      type: 'Time',
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
    question_id: 'question2'
  };
  const ANSWER_VALUE = of('09:15:00');
  let component: NocTimeFieldComponent;
  let fixture: ComponentFixture<NocTimeFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        NocTimeFieldComponent,
        RpxTranslateMockPipe
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
    fixture = TestBed.createComponent(NocTimeFieldComponent);
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
