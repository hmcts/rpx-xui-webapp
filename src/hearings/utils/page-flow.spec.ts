import { config, Observable, of } from 'rxjs';
import { ScreenNavigationModel } from '../models/screenNavigation.model';
import { PageFlow } from './page-flow';

describe('PageFlow', () => {
  let pageFlow: PageFlow;
  const mockRoute = jasmine.createSpyObj('Route', ['navigate']);
  const mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);

  const SCREEN_FLOW: ScreenNavigationModel[] = [
    {
      screenName: 'hearing-requirements',
      navigation: [
        {
          resultValue: 'hearing-facilities',
        },
      ],
    },
    {
      screenName: 'hearing-facilities',
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
          resultValue: 'hearing-attendance',
        },
      ],
    },
    {
      screenName: 'hearing-attendance',
      navigation: [
        {
          resultValue: 'hearing-venue',
        },
      ],
    },
    {
      screenName: 'hearing-venue',
      conditionKey: 'regionId',
      navigation: [
        {
          conditionOperator: 'INCLUDE',
          conditionValue: '7',
          resultValue: 'hearing-welsh',
        },
        {
          conditionOperator: 'NOT INCLUDE',
          conditionValue: '7',
          resultValue: 'hearing-judge',
        },
      ],
    },
    {
      screenName: 'hearing-welsh',
      navigation: [
        {
          resultValue: 'hearing-judge',
        },
      ],
    },
    {
      screenName: 'hearing-judge',
      navigation: [
        {
          resultValue: 'hearing-panel',
        },
      ],
    },
    {
      screenName: 'hearing-panel',
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
          resultValue: 'hearing-additional-instructions',
        },
      ],
    },
    {
      screenName: 'hearing-additional-instructions',
      navigation: [
        {
          resultValue: 'hearing-create-edit-summary',
        },
      ],
    },
  ];

  beforeEach(() => {
    pageFlow = new PageFlow(mockStore, mockRoute);
  });

  it('should get current page', () => {
    mockRoute.url = '/request/hearing/hearing-requirements';
    expect(pageFlow.getCurrentPage()).toBe('hearing-requirements');
  });

  it('should strip fragment from current page', () => {
    mockRoute.url = '/request/hearing/hearing-requirements#details';
    expect(pageFlow.getCurrentPage()).toBe('hearing-requirements');
  });

  it('should get last page', () => {
    const screensNavigations$: Observable<ScreenNavigationModel[]> = of(SCREEN_FLOW);
    pageFlow.hearingConditions$ = of({});
    mockRoute.url = '/request/hearing/hearing-facilities';
    const lastPage = pageFlow.getLastPage(screensNavigations$);
    expect(lastPage).toBe('hearing-requirements');
  });

  it('should get last page hearing-welsh if regionId is including Wales', () => {
    const screensNavigations$: Observable<ScreenNavigationModel[]> = of(SCREEN_FLOW);
    pageFlow.hearingConditions$ = of({ regionId: '7' });
    mockRoute.url = '/request/hearing/hearing-judge';
    const lastPage = pageFlow.getLastPage(screensNavigations$);
    expect(lastPage).toBe('hearing-welsh');
  });

  it('should get last page hearing-venue if regionId is not including Wales', () => {
    const screensNavigations$: Observable<ScreenNavigationModel[]> = of(SCREEN_FLOW);
    pageFlow.hearingConditions$ = of({ regionId: '8' });
    mockRoute.url = '/request/hearing/hearing-judge';
    const lastPage = pageFlow.getLastPage(screensNavigations$);
    expect(lastPage).toBe('hearing-venue');
  });

  it('should get next page', () => {
    const screensNavigations$: Observable<ScreenNavigationModel[]> = of(SCREEN_FLOW);
    pageFlow.hearingConditions$ = of({});
    mockRoute.url = '/request/hearing/hearing-requirements';
    const nextPage = pageFlow.getNextPage(screensNavigations$);
    expect(nextPage).toBe('hearing-facilities');
  });

  it('should get next page hearing-welsh if regionId is including Wales', () => {
    const screensNavigations$: Observable<ScreenNavigationModel[]> = of(SCREEN_FLOW);
    pageFlow.hearingConditions$ = of({ regionId: '7' });
    mockRoute.url = '/request/hearing/hearing-venue';
    const nextPage = pageFlow.getNextPage(screensNavigations$);
    expect(nextPage).toBe('hearing-welsh');
  });

  it('should get next page hearing-judge if regionId is not including Wales', () => {
    const screensNavigations$: Observable<ScreenNavigationModel[]> = of(SCREEN_FLOW);
    pageFlow.hearingConditions$ = of({ regionId: '8' });
    mockRoute.url = '/request/hearing/hearing-venue';
    const nextPage = pageFlow.getNextPage(screensNavigations$);
    expect(nextPage).toBe('hearing-judge');
  });

  it('should return empty next page when condition key is not present in hearing conditions', () => {
    const screensNavigations$: Observable<ScreenNavigationModel[]> = of(SCREEN_FLOW);
    pageFlow.hearingConditions$ = of({});
    mockRoute.url = '/request/hearing/hearing-venue';

    expect(pageFlow.getNextPage(screensNavigations$)).toBe('');
  });

  it('should return empty next page for unsupported navigation condition operator', () => {
    const screensNavigations$: Observable<ScreenNavigationModel[]> = of([
      {
        screenName: 'hearing-venue',
        conditionKey: 'regionId',
        navigation: [
          {
            conditionOperator: 'UNKNOWN' as any,
            conditionValue: '7',
            resultValue: 'hearing-welsh',
          },
        ],
      },
    ]);
    pageFlow.hearingConditions$ = of({ regionId: '7' });
    mockRoute.url = '/request/hearing/hearing-venue';

    expect(pageFlow.getNextPage(screensNavigations$)).toBe('');
  });

  it('should throw when the current page is not found in navigation config', () => {
    const screensNavigations$: Observable<ScreenNavigationModel[]> = of(SCREEN_FLOW);
    pageFlow.hearingConditions$ = of({});
    mockRoute.url = '/request/hearing/missing-page';
    const previousOnUnhandledError = config.onUnhandledError;
    let reportedError: Error;

    jasmine.clock().install();
    try {
      config.onUnhandledError = (error) => {
        reportedError = error as Error;
      };

      pageFlow.getNextPage(screensNavigations$);
      jasmine.clock().tick(0);

      expect(reportedError).toEqual(jasmine.any(Error));
      expect(reportedError.message).toBe('Current screen not found: missing-page');
    } finally {
      config.onUnhandledError = previousOnUnhandledError;
      jasmine.clock().uninstall();
    }
  });

  afterEach(() => {
    pageFlow = null;
  });
});
