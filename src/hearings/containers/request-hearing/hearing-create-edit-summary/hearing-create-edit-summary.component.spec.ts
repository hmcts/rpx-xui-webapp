import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { initialState } from '../../../hearing.test.data';
import { ACTION } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import { HearingCreateEditSummaryComponent } from './hearing-create-edit-summary.component';

describe('HearingCreateEditSummaryComponent', () => {
  let component: HearingCreateEditSummaryComponent;
  let fixture: ComponentFixture<HearingCreateEditSummaryComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingCreateEditSummaryComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingCreateEditSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call removeUnnecessarySummaryTemplateItems in ngOnInit', () => {
    const rmvSummaryTemp = spyOn(component, 'removeUnnecessarySummaryTemplateItems');
    component.ngOnInit();
    expect(rmvSummaryTemp).toHaveBeenCalled();
  });

  it('should call getScreenFlowFromStore ', () => {
    const store = [{ screenName: 'hearing-link', navigation: [] }];
    const screenFlow = spyOn(component, 'getScreenFlowFromStore').and.returnValue(of(store));
    component.removeUnnecessarySummaryTemplateItems();
    expect(screenFlow).toHaveBeenCalled();
  });
  it('should display fewer items when screenFlow is less', () => {
    spyOn(component,'removeUnnecessarySummaryTemplateItems').and.callThrough();
    fixture.detectChanges();
    component.getScreenFlowFromStore().subscribe(scr => {
      const sFlow = scr?.hearings?.hearingValues?.serviceHearingValuesModel?.screenFlow[1];
      fixture.detectChanges();
      component.template = component.template.filter(tl => tl.screenName.includes(sFlow.screenName));
      fixture.detectChanges();
     expect(component.template.length).toEqual(1);
    });
  });

  afterEach(() => {
    fixture.destroy();
  });
});
