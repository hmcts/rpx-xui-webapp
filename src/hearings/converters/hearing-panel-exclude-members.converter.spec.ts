import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { hearingPriorityRefData, initialState } from '../hearing.test.data';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { HearingPanelExcludeMemberConverter } from './hearing-panel-exclude-members.converter';
import { HttpClient } from '@angular/common/http';
import { ALL_JUDICIAL_USERS } from 'api/prd/judicial/data/judicial.mock.data';

describe('Hearing Panel ExcludeMember Converter', () => {
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
          useValue: {
            snapshot: {
              data: {
                hearingPriorities: hearingPriorityRefData,
              },
            },
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { panelDetails: ALL_JUDICIAL_USERS },
            },
          },
        },
      ],
    });
    router = TestBed.get(ActivatedRoute);
    converter = new HearingPanelExcludeMemberConverter(router);
  });

  it('should transform exclude panel members as expected', () => {
    const STATE: State = initialState.hearings;
    const result$ = converter.transformAnswer(of(STATE));
    const transformedValue = '<ul><li>James Priest</li></ul>';
    const expected = cold('(b|)', { b: transformedValue });
    expect(result$).toBeObservable(expected);
  });
});
