import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { NocAnswer, NocState } from '../../models';
import * as fromFeature from '../../store';
import { UtilsModule } from '../noc-field/utils/utils.module';
import { NocCheckYourAnswersComponent } from './noc-check-your-answers.component';

@Pipe({ name: 'rpxTranslate' })
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('NocCheckYourAnswersComponent', () => {
  let store;
  let spyOnPipeToStore = jasmine.createSpy();
  let spyOnDispatchToStore = jasmine.createSpy();
  let component: NocCheckYourAnswersComponent;
  let fixture: ComponentFixture<NocCheckYourAnswersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [NocCheckYourAnswersComponent, RpxTranslateMockPipe],
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
    store = TestBed.inject(Store);
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
      value: 'James'
    };
    component.navToQAndA(answer);
    expect(spyOnDispatchToStore).toHaveBeenCalledWith(new fromFeature.ChangeNavigation(NocState.QUESTION));
  });
});
