import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { LovRefDataModel } from '../models/lovRefData.model';
import { State } from '../store';
import { ParticipantAttendenceAnswerConverter } from './participant-attendence.answer.converter';

describe('ParticipantAttendenceAnswerConverter', () => {

  let converter: ParticipantAttendenceAnswerConverter;
  let store: Store<any>;
  let router: any;
  const PARTY_CHANNELS: LovRefDataModel[] = [{
    key: 'inPerson',
    value_en: 'In person',
    value_cy: '',
    hintText_EN: 'in person',
    hintTextCY: 'Wyneb yn wyneb',
    order: 1,
    parentKey: null,
  },
  {
    key: 'byVideo',
    value_en: 'By Video',
    value_cy: '',
    hintText_EN: 'By Video',
    hintTextCY: 'Wyneb yn wyneb',
    order: 1,
    parentKey: null,
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                partyChannels: PARTY_CHANNELS,
              },
            },
          },
        }
      ]
    });
    store = TestBed.get(Store);
    router = TestBed.get(ActivatedRoute);
    converter = new ParticipantAttendenceAnswerConverter(router);
  });

  it('should transform hearing stage', () => {
    const STATE: State = initialState.hearings;
    const result$ = converter.transformAnswer(of(STATE));
    const room = 'Jane and Smith - In person\<br\>DWP - By Video';
    const expected = cold('(b|)', { b: room });
    expect(result$).toBeObservable(expected);
  });

});
