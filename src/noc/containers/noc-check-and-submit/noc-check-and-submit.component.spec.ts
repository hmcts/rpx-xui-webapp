import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { NocAnswer } from '../../models';
import { NocCheckAndSubmitComponent } from './noc-check-and-submit.component';

describe('NocCheckAndSubmitComponent', () => {
  let component: NocCheckAndSubmitComponent;
  let fixture: ComponentFixture<NocCheckAndSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ NocCheckAndSubmitComponent ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocCheckAndSubmitComponent);
    component = fixture.componentInstance;
    component.qAndA$ = of(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign the input value of our component', () => {
    const answers: NocAnswer[] = [{
      question_id: 'Question_123456', value: 'bob', question_text: of('What is your first name?')
    }, {
      question_id: 'Question_678910', value: 'the builder', question_text: of('What is your last name?')
    }];
    const answers$ = of(answers);
    component.qAndA$ = answers$;
    fixture.detectChanges();
    expect(component.qAndA$).toEqual(answers$);
  });
});
