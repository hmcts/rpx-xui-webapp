import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { NocAnswer, NocState } from '../../models';
import * as fromFeature from '../../store';
import { UtilsModule } from '../noc-field/utils/utils.module';
import { NocCheckYourAnswersComponent } from './noc-check-your-answers.component';

describe('NocCheckYourAnswersComponent', () => {
  let store: MockStore<fromFeature.State>;
  let spyOnPipeToStore = jasmine.createSpy();
  let spyOnDispatchToStore = jasmine.createSpy();
  let component: NocCheckYourAnswersComponent;
  let fixture: ComponentFixture<NocCheckYourAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ NocCheckYourAnswersComponent ],
      imports: [
        UtilsModule
      ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOnPipeToStore = spyOn(store, 'pipe').and.callThrough();
    spyOnDispatchToStore = spyOn(store, 'dispatch').and.callThrough();
    spyOnPipeToStore.and.returnValue(of('1231123112311231'));
    fixture = TestBed.createComponent(NocCheckYourAnswersComponent);
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

  it('should navToRef', () => {
    component.navToRef();
    expect(spyOnDispatchToStore).toHaveBeenCalledWith(new fromFeature.ChangeNavigation(NocState.START));
  });

  it('should navToQAndA', () => {
    const answer: NocAnswer = {
      question_id: 'q1',
      question_text: of('name'),
      value: 'James',
    };
    component.navToQAndA(answer);
    expect(spyOnDispatchToStore).toHaveBeenCalledWith(new fromFeature.ChangeNavigation(NocState.QUESTION));
  });
});
