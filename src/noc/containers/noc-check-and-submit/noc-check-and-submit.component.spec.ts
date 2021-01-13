import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { NocAnswer, NocEvent, NocNavigationEvent, NocQuestion } from '../../models';
import * as fromFeature from '../../store';
import { NocCheckAndSubmitComponent } from './noc-check-and-submit.component';

describe('NocCheckAndSubmitComponent', () => {
  let component: NocCheckAndSubmitComponent;
  let fixture: ComponentFixture<NocCheckAndSubmitComponent>;
  let store: MockStore<fromFeature.State>;
  let spyOnPipeToStore: any;
  let spyOnDispatchToStore = jasmine.createSpy();

  const nocQuestions: NocQuestion[] = [{
    caseTypeId: 't1',
    order: '1',
    questionText: 'first name',
    answerFieldType: {
      id: 'q1',
      type: 'text',
      min: null,
      max: null,
      regularExpression: null,
      fixedListItems: null,
      complexFields: null,
      collectionFieldType: null,
    },
    displayContextParameter: '',
    challengeQuestionId: '',
    answerField: '',
    questionId: 'q1'
  }, {
    caseTypeId: 't2',
    order: '2',
    questionText: 'last name',
    answerFieldType: {
      id: 'q2',
      type: 'text',
      min: null,
      max: null,
      regularExpression: null,
      fixedListItems: null,
      complexFields: null,
      collectionFieldType: null,
    },
    displayContextParameter: '',
    challengeQuestionId: '',
    answerField: '',
    questionId: 'q2'
  }];

  const nocAnswers: NocAnswer[] = [{
    question_id: 'q1',
    value: 'James'
  }, {
    question_id: 'q2',
    value: 'Priest'
  }];
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
    store = TestBed.get(Store);
    spyOnDispatchToStore = spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(NocCheckAndSubmitComponent);
    component = fixture.componentInstance;
    component.qAndA$ = of(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    spyOnPipeToStore = spyOn(store, 'pipe');
    component.questions$ = spyOnPipeToStore.and.returnValue(of(nocQuestions));
    component.answers$ = spyOnPipeToStore.and.returnValue(of(nocAnswers));
    component.ngOnInit();
    fixture.detectChanges();
    component.qAndA$.toPromise().then(results => {
      expect(results.length).toBe(2);
    });
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

  it('should verify and submit NoC', () => {
    const spyVerifyAndSubmitNoC = spyOn(component, 'verifyAndSubmitNoC').and.callThrough();
    component.navigationHandler(NocNavigationEvent.CHECK_ANSWERS);
    expect(spyVerifyAndSubmitNoC).toHaveBeenCalled();
  });

  it('should navigationHandler', () => {
    expect(() => { component.navigationHandler(NocNavigationEvent.CONTINUE); }).toThrow(new Error('Invalid option'));
  });

  it('should verify and submit NoC', () => {
    component.affirmationAgreed = true;
    const nocEvent: NocEvent = {
      caseReference: '1111222233334444',
      nocAnswers: [{
        question_id: 'q1',
        value: 'a1'
      }]
    };
    component.caseRefernce = '1111222233334444';
    component.nocAnswers = [{
      question_id: 'q1',
      value: 'a1'
    }];
    component.verifyAndSubmitNoC();
    expect(spyOnDispatchToStore).toHaveBeenCalledWith(new fromFeature.SubmitNoc(nocEvent));
  });

  it('should set affirmation disagree error', () => {
    component.affirmationAgreed = false;
    component.verifyAndSubmitNoC();
    expect(spyOnDispatchToStore).toHaveBeenCalledWith(new fromFeature.SetAffirmationDisagreeError());
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
