import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../hearing.test.data';
import {DefaultAnswerConverter} from './default.answer.converter';

describe('DefaultAnswerConverter', () => {

  let defaultAnswerConverter: DefaultAnswerConverter;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ]
    });
    store = TestBed.get(Store);
    defaultAnswerConverter = new DefaultAnswerConverter(store);
  });

  it('should return default converter', () => {
    const result$ = defaultAnswerConverter.transformAnswer();
    const msg = 'Not implement yet';
    result$.subscribe(result => expect(result).toBe(msg));
  });

});
