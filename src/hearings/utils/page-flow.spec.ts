import { Observable, of } from 'rxjs';
import { ScreenNavigationModel } from '../models/screenNavigation.model';
import { PageFlow } from './page-flow';
import {
  HEARING_ADDITIONAL_INSTRUCTIONS,
  HEARING_ATTENDANCE, HEARING_FACILITIES, HEARING_JUDGE, HEARING_PANEL_REQUIRED, HEARING_PANEL_SELECTOR,
  HEARING_REQUIREMENTS,
  HEARING_STAGE, HEARING_TIMING, HEARING_VENUE, HEARING_WELSH
} from '../../../api/hearings/data/defaultScreenFlow.data';

describe('PageFlow', () => {
  let pageFlow: PageFlow;
  const mockRoute = jasmine.createSpyObj('Route', ['navigate']);
  const mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);

  const SCREEN_FLOW: ScreenNavigationModel[] = [
    HEARING_REQUIREMENTS,
    HEARING_FACILITIES,
    HEARING_STAGE,
    HEARING_ATTENDANCE,
    HEARING_VENUE,
    HEARING_WELSH,
    HEARING_PANEL_REQUIRED,
    HEARING_JUDGE,
    HEARING_PANEL_SELECTOR,
    HEARING_TIMING,
    HEARING_ADDITIONAL_INSTRUCTIONS
  ];

  beforeEach(() => {
    pageFlow = new PageFlow(mockStore, mockRoute);
  });

  it('should get current page', () => {
    mockRoute.url = '/request/hearing/hearing-requirements';
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

  afterEach(() => {
    pageFlow = null;
  });
});
