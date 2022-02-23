import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { hearingPriorityRefData, initialState } from '../hearing.test.data';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { HearingPanelOtherPanelRolesConverter } from './hearing-panel-other-panel-roles.converter'
import { HttpClient } from '@angular/common/http';
import { ALL_JUDICIAL_USERS } from 'api/prd/judicial/data/judicial.mock.data';
import { OTHER_PANEL_ROLES } from 'api/prd/lov/data/lov.mock.data';

describe('HearingPanelOtherPanelRolesConverter', () => {
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
              data: { otherPanelRoles: OTHER_PANEL_ROLES },
            },
          },
        },
      ],
    });
    router = TestBed.get(ActivatedRoute);
    converter = new HearingPanelOtherPanelRolesConverter(router);
  });

  it('should transform other panel roles as expected', () => {
    const STATE: State = initialState.hearings;
    const result$ = converter.transformAnswer(of(STATE));
    const transformedValue = '<ul><li>Disability qualified panel member</li><li>Medically qualified panel member - Cardiologist</li></ul>';
    const expected = cold('(b|)', { b: transformedValue });
    expect(result$).toBeObservable(expected);
  });
});
