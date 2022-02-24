import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { HearingPanelRequiredConverter } from './hearing-panel-required.converter'
import { HttpClient } from '@angular/common/http';

fdescribe('Hearing Panel required Converter', () => {
  let converter: AnswerConverter;
  let router: any;

  const httpClientMock = jasmine.createSpyObj<HttpClient>('HttpClient', [
    'get',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        {
          provide: HttpClient,
          useValue: httpClientMock,
        },
        {
          provide: ActivatedRoute,
        }
      ],
    });
    router = TestBed.get(ActivatedRoute);
    converter = new HearingPanelRequiredConverter(router);
  });

  it('should transform panel required flag as expected', () => {
    const STATE: State = initialState.hearings;
    const result$ = converter.transformAnswer(of(STATE));
    const transformedValue = 'Yes';
    const expected = cold('(b|)', { b: transformedValue });
    expect(result$).toBeObservable(expected);
  });
});
