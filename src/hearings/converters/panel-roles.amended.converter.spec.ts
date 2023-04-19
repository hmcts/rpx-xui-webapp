import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { hearingStageRefData, initialState } from '../hearing.test.data';
import { State } from '../store';
import { PanelRolesAmendedConverter } from './panel-roles.amended.converter';

describe('PanelRolesAmendedConverter', () => {
  let converter: PanelRolesAmendedConverter;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: Store<any>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingStageOptions: hearingStageRefData
              }
            }
          }
        }
      ]
    });
    store = TestBed.inject(Store);
    router = TestBed.inject(ActivatedRoute);
    converter = new PanelRolesAmendedConverter();
  });

  it('should not transform the amended flag when previous vs current hearing type are equal', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelSpecialisms: ['BBA3-DQPM', 'BBA3-MQPM2-002']
    };
    const result$ = converter.transformIsAmended(of(STATE));
    const isAmended = true;
    const expected = cold('(b|)', { b: isAmended });
    expect(result$).toBeObservable(expected);
  });
});

