import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {LovRefDataModel} from '../models/lovRefData.model';
import {State} from '../store';
import {ReasonForRequestCancellationAnswerConverter} from './reason-for-request-cancellation.answer.converter';

describe('ReasonForRequestCancellationAnswerConverter', () => {
  const CANCEL_HEARING_REQUEST_REASONS: LovRefDataModel[] = [
    {
      category_key: 'CaseManagementCancellationReasons',
      key: 'withdraw',
      value_en: 'Withdrawn',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'CaseManagementCancellationReasons',
      key: 'struck',
      value_en: 'Struck Out',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'CaseManagementCancellationReasons',
      key: 'unable',
      value_en: 'Party Unable To Attend',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'CaseManagementCancellationReasons',
      key: 'exclusio',
      value_en: 'Exclusion',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'CaseManagementCancellationReasons',
      key: 'incompl',
      value_en: 'Incomplete Tribunal',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'CaseManagementCancellationReasons',
      key: 'listerr',
      value_en: 'Listed In error',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'CaseManagementCancellationReasons',
      key: 'other',
      value_en: 'Other',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'CaseManagementCancellationReasons',
      key: 'notready',
      value_en: 'No longer ready for hearing',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'CaseManagementCancellationReasons',
      key: 'settled',
      value_en: 'Settled',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'CaseManagementCancellationReasons',
      key: 'jodir',
      value_en: 'Judicial direction',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'CaseManagementCancellationReasons',
      key: 'notpaid',
      value_en: 'Fee not paid',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'CaseManagementCancellationReasons',
      key: 'lapsed',
      value_en: 'Lapsed',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    }
  ];
  let converter: ReasonForRequestCancellationAnswerConverter;
  let store: Store<any>;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                cancelHearingReasons: CANCEL_HEARING_REQUEST_REASONS,
              },
            },
          },
        }
      ]
    });
    store = TestBed.get(Store);
    router = TestBed.get(ActivatedRoute);
    converter = new ReasonForRequestCancellationAnswerConverter(router);
  });

  it('should transform hearing cancellation reason', () => {
    const STATE: State = initialState.hearings;
    const result$ = converter.transformAnswer(of(STATE));
    const cancelReason = 'Withdrawn<br>Struck Out';
    const expected = cold('(b|)', {b: cancelReason});
    expect(result$).toBeObservable(expected);
  });

});
