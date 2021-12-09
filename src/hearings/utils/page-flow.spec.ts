import {Observable, of} from 'rxjs';
import {ScreenNavigationModel} from '../models/screenNavigation.model';
import {PageFlow} from './page-flow';

describe('PageFlow', () => {
  let pageFlow: PageFlow;
  const mockRoute = jasmine.createSpyObj('Route', ['navigate']);
  const mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);

  const SCREEN_FLOW: ScreenNavigationModel[] = [
    {
      screenName: 'hearing-requirement',
      navigation: [
        {
          resultValue: 'additional-facilities',
        },
      ],
    },
    {
      screenName: 'additional-facilities',
      navigation: [
        {
          resultValue: 'hearing-stage',
        },
      ],
    },
    {
      screenName: 'hearing-stage',
      navigation: [
        {
          resultValue: 'how-party-attend',
        },
      ],
    },
    {
      screenName: 'how-party-attend',
      navigation: [
        {
          resultValue: 'location-search',
        },
      ],
    },
    {
      screenName: 'location-search',
      conditionKey: 'region',
      navigation: [
        {
          conditionOperator: 'INCLUDE',
          conditionValue: 'Wales',
          resultValue: 'welsh-hearing',
        },
        {
          conditionOperator: 'NOT INCLUDE',
          conditionValue: 'Wales',
          resultValue: 'specify-judge',
        },
      ],
    },
    {
      screenName: 'welsh-hearing',
      navigation: [
        {
          resultValue: 'specify-judge',
        },
      ],
    },
    {
      screenName: 'specify-judge',
      navigation: [
        {
          resultValue: 'require-panel-or-not',
        },
      ],
    },
    {
      screenName: 'require-panel-or-not',
      navigation: [
        {
          resultValue: 'hearing-timing',
        },
      ],
    },
    {
      screenName: 'hearing-timing',
      navigation: [
        {
          resultValue: 'additional-instruction',
        },
      ],
    },
    {
      screenName: 'additional-instruction',
      navigation: [
        {
          resultValue: 'check-answers',
        },
      ],
    },
  ];

  beforeEach(() => {
    pageFlow = new PageFlow(mockStore, mockRoute);
  });

  it('should get current page', () => {
    mockRoute.url = '/request/hearing/hearing-requirement';
    expect(pageFlow.getCurrentPage()).toBe('hearing-requirement');
  });

  it('should get last page', () => {
    const screensNavigations$: Observable<ScreenNavigationModel[]> = of(SCREEN_FLOW);
    pageFlow.hearingConditions$ = of({});
    mockRoute.url = '/request/hearing/additional-facilities';
    const lastPage = pageFlow.getLastPage(screensNavigations$);
    expect(lastPage).toBe('hearing-requirement');
  });

  it('should get last page welsh-hearing if region is including Wales', () => {
    const screensNavigations$: Observable<ScreenNavigationModel[]> = of(SCREEN_FLOW);
    pageFlow.hearingConditions$ = of({region: 'Wales, South East'});
    mockRoute.url = '/request/hearing/specify-judge';
    const lastPage = pageFlow.getLastPage(screensNavigations$);
    expect(lastPage).toBe('welsh-hearing');
  });


  it('should get last page location-search if region is not including Wales', () => {
    const screensNavigations$: Observable<ScreenNavigationModel[]> = of(SCREEN_FLOW);
    pageFlow.hearingConditions$ = of({region: 'South East'});
    mockRoute.url = '/request/hearing/specify-judge';
    const lastPage = pageFlow.getLastPage(screensNavigations$);
    expect(lastPage).toBe('location-search');
  });

  it('should get next page', () => {
    const screensNavigations$: Observable<ScreenNavigationModel[]> = of(SCREEN_FLOW);
    pageFlow.hearingConditions$ = of({});
    mockRoute.url = '/request/hearing/hearing-requirement';
    const nextPage = pageFlow.getNextPage(screensNavigations$);
    expect(nextPage).toBe('additional-facilities');
  });

  it('should get next page welsh-hearing if region is including Wales', () => {
    const screensNavigations$: Observable<ScreenNavigationModel[]> = of(SCREEN_FLOW);
    pageFlow.hearingConditions$ = of({region: 'Wales, South East'});
    mockRoute.url = '/request/hearing/location-search';
    const nextPage = pageFlow.getNextPage(screensNavigations$);
    expect(nextPage).toBe('welsh-hearing');
  });

  it('should get next page specify-judge if region is not including Wales', () => {
    const screensNavigations$: Observable<ScreenNavigationModel[]> = of(SCREEN_FLOW);
    pageFlow.hearingConditions$ = of({region: 'South East'});
    mockRoute.url = '/request/hearing/location-search';
    const nextPage = pageFlow.getNextPage(screensNavigations$);
    expect(nextPage).toBe('specify-judge');
  });

  afterEach(() => {
    pageFlow = null;
  });
})
;
