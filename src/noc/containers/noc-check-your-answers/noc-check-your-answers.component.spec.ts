import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { NocAnswer } from '../../models';
import * as fromNocStore from '../../store';
import { NocCheckYourAnswersComponent } from './noc-check-your-answers.component';

describe('NocCheckYourAnswersComponent', () => {
  const NOC_ANSWERS: Observable<NocAnswer[]> = of([{
    question_id: 'q111111',
    question_text: of('first name?'),
    value: 'John'
  }, {
    question_id: 'q222222',
    question_text: of('last name?'),
    value: 'Priest'
  }]);

  let store: MockStore<fromNocStore.State>;
  let component: NocCheckYourAnswersComponent;
  let fixture: ComponentFixture<NocCheckYourAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NocCheckYourAnswersComponent ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocCheckYourAnswersComponent);
    component = fixture.componentInstance;
    component.qAndA$ = NOC_ANSWERS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
