import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {LovRefDataModel} from '../models/lovRefData.model';
import {State} from '../store';
import {ReasonForActualCancellationAnswerConverter} from './reason-for-actual-cancellation.answer.converter';

describe('ReasonForActualCancellationAnswerConverter', () => {
  const CANCEL_HEARING_ACTUAL_REASONS: LovRefDataModel[] = [
    {
      category_key: 'ActualCancellationReasonCodes',
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
      category_key: 'ActualCancellationReasonCodes',
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
      category_key: 'ActualCancellationReasonCodes',
      key: 'unable',
      value_en: 'Party unable to attend',
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
      category_key: 'ActualCancellationReasonCodes',
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
      category_key: 'ActualCancellationReasonCodes',
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
      category_key: 'ActualCancellationReasonCodes',
      key: 'listerr',
      value_en: 'Listed in error',
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
      category_key: 'ActualCancellationReasonCodes',
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
      category_key: 'ActualCancellationReasonCodes',
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
      category_key: 'ActualCancellationReasonCodes',
      key: 'notatt',
      value_en: 'Party did not attend',
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
      category_key: 'ActualCancellationReasonCodes',
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
  let converter: ReasonForActualCancellationAnswerConverter;
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
                cancelHearingActualReasons: CANCEL_HEARING_ACTUAL_REASONS,
              },
            },
          },
        }
      ]
    });
    store = TestBed.get(Store);
    router = TestBed.get(ActivatedRoute);
    converter = new ReasonForActualCancellationAnswerConverter(router);
  });

  it('should transform hearing cancellation reason', () => {
    const STATE: State = initialState.hearings;
    const result$ = converter.transformAnswer(of(STATE));
    const cancelReason = 'Party unable to attend';
    const expected = cold('(b|)', {b: cancelReason});
    expect(result$).toBeObservable(expected);
  });

});
