import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initialState } from '../../../../hearing.test.data';
import { LovRefDataModel } from '../../../../models/lovRefData.model';
import { HearingsService } from '../../../../services/hearings.service';
import { HearingTimingSectionComponent } from './hearing-timing-section.component';

describe('HearingTimingSectionComponent', () => {
  let component: HearingTimingSectionComponent;
  let fixture: ComponentFixture<HearingTimingSectionComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
  const hearingsService = new HearingsService(mockedHttpClient);

  const hearingPrioritiesRefData: LovRefDataModel[] = [
    {
      key: 'urgent',
      value_en: 'Urgent',
      value_cy: '',
      hint_text_en: 'Urgent',
      hint_text_cy: '',
      lov_order: 1,
      parent_key: null,
      parent_category: null,
      category_key: null,
      active_flag: 'Y'
    },
    {
      key: 'standard',
      value_en: 'Standard',
      value_cy: '',
      hint_text_en: 'Standard',
      hint_text_cy: '',
      lov_order: 2,
      parent_key: null,
      parent_category: null,
      category_key: null,
      active_flag: 'Y'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        HearingTimingSectionComponent
      ],
      providers: [
        { provide: HearingsService, useValue: hearingsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingTimingSectionComponent);
    component = fixture.componentInstance;
    component.hearingPrioritiesRefData = hearingPrioritiesRefData;
    component.hearingDetails = initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify component data', () => {
    component.ngOnInit();
    expect(component.hearingLength).toEqual('1 Hour');
    expect(component.specificDate).toEqual('Choose a date range<br>Earliest start date: 12 December 2022<br>Latest end date: 12 December 2022');
    expect(component.hearingPriority).toEqual('Standard');
  });

  it('should display label', () => {
    hearingsService.propertiesUpdatedOnPageVisit = {
      caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
      parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties,
      hearingWindow: initialState.hearings.hearingValues.serviceHearingValuesModel.hearingWindow,
      afterPageVisit: {
        reasonableAdjustmentChangesRequired: false,
        partyDetailsChangesRequired: false,
        hearingWindowFirstDateMustBeChangesRequired: true
      }
    };
    component.ngOnInit();
    expect(component.hearingWindowChangesRequired).toEqual(true);
  });

  it('should not display label', () => {
    hearingsService.propertiesUpdatedOnPageVisit = {
      caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
      parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties,
      hearingWindow: initialState.hearings.hearingValues.serviceHearingValuesModel.hearingWindow,
      afterPageVisit: {
        reasonableAdjustmentChangesRequired: true,
        partyDetailsChangesRequired: true,
        hearingWindowFirstDateMustBeChangesRequired: false
      }
    };
    component.ngOnInit();
    expect(component.hearingWindowChangesRequired).toEqual(false);
  });

  it('should verify onChange', () => {
    spyOn(component.changeEditHearing, 'emit');
    component.onChange('hearingLength');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'hearingLength', changeLink: '/hearings/request/hearing-timing#durationdays'
    });
    component.onChange('hearingSpecificDate');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'hearingSpecificDate', changeLink: '/hearings/request/hearing-timing#noSpecificDate'
    });
    component.onChange('hearingPriority');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'hearingPriority', changeLink: '/hearings/request/hearing-timing#urgent'
    });
  });
});
