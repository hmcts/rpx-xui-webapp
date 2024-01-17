import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initialState, partySubChannelsRefData } from '../../../../hearing.test.data';
import { LovRefDataModel } from '../../../../models/lovRefData.model';
import { HearingsService } from '../../../../services/hearings.service';
import { ParticipantAttendanceSectionComponent } from './participant-attendance-section.component';

describe('ParticipantAttendanceSectionComponent', () => {
  let component: ParticipantAttendanceSectionComponent;
  let fixture: ComponentFixture<ParticipantAttendanceSectionComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
  const hearingsService = new HearingsService(mockedHttpClient);

  const partyChannels: LovRefDataModel[] = [
    {
      key: 'inPerson',
      value_en: 'In person',
      value_cy: '',
      hint_text_en: 'in person',
      hint_text_cy: '',
      lov_order: 1,
      parent_key: null,
      category_key: 'HearingChannel',
      active_flag: 'Y',
      parent_category: null
    },
    {
      key: 'byPhone',
      value_en: 'By phone',
      value_cy: '',
      hint_text_en: 'By Phone',
      hint_text_cy: '',
      lov_order: 2,
      parent_key: null,
      category_key: 'HearingChannel',
      active_flag: 'Y',
      parent_category: null
    },
    {
      key: 'byVideo',
      value_en: 'By video',
      value_cy: '',
      hint_text_en: 'By video',
      hint_text_cy: '',
      lov_order: 4,
      parent_key: null,
      category_key: 'HearingChannel',
      active_flag: 'Y',
      parent_category: null
    },
    {
      key: 'notAttending',
      value_en: 'Not attending',
      value_cy: '',
      hint_text_en: 'not attending',
      hint_text_cy: '',
      lov_order: 5,
      parent_key: null,
      category_key: 'HearingChannel',
      active_flag: 'Y',
      parent_category: null
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        ParticipantAttendanceSectionComponent
      ],
      providers: [
        { provide: HearingsService, useValue: hearingsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ParticipantAttendanceSectionComponent);
    component = fixture.componentInstance;
    component.partyChannelsRefData = partyChannels;
    component.partySubChannelsRefData = partySubChannelsRefData;
    component.hearingRequestMainModel = initialState.hearings.hearingRequest.hearingRequestMainModel;
    component.serviceHearingValuesModel = initialState.hearings.hearingValues.serviceHearingValuesModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set participant attendance details', () => {
    expect(component.isPaperHearing).toEqual('No');
    expect(component.participantChannels).toEqual(['By phone']);
    expect(component.participantAttendanceModes).toEqual([{ partyName: 'Jane and Smith', channel: 'In person', partyNameChanged: true }]);
    expect(component.numberOfPhysicalAttendees).toEqual(3);
  });

  it('should display label', () => {
    hearingsService.propertiesUpdatedOnPageVisit = {
      caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
      parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties,
      hearingWindow: initialState.hearings.hearingValues.serviceHearingValuesModel.hearingWindow,
      afterPageVisit: {
        reasonableAdjustmentChangesRequired: false,
        partyDetailsChangesRequired: true,
        hearingWindowChangesRequired: false
      }
    };
    component.ngOnInit();
    expect(component.partyDetailsChangesRequired).toEqual(true);
  });

  it('should not display label', () => {
    hearingsService.propertiesUpdatedOnPageVisit = {
      caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
      parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties,
      hearingWindow: initialState.hearings.hearingValues.serviceHearingValuesModel.hearingWindow,
      afterPageVisit: {
        reasonableAdjustmentChangesRequired: true,
        partyDetailsChangesRequired: false,
        hearingWindowChangesRequired: true
      }
    };
    component.ngOnInit();
    expect(component.partyDetailsChangesRequired).toEqual(false);
  });

  it('should verify onChange', () => {
    spyOn(component.changeEditHearing, 'emit');
    component.onChange('paperHearing');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'paperHearing', changeLink: '/hearings/request/hearing-attendance#paperHearingYes'
    });
    component.onChange('howParticipantsAttendant');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'howParticipantsAttendant', changeLink: '/hearings/request/hearing-attendance#hearingLevelChannelList'
    });
    component.onChange('howAttendant');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'howAttendant', changeLink: '/hearings/request/hearing-attendance#partyChannel0'
    });
    component.onChange('attendantPersonAmount');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'attendantPersonAmount', changeLink: '/hearings/request/hearing-attendance#attendance-number'
    });
  });
});
