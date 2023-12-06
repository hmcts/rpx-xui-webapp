import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initialState, partySubChannelsRefData } from 'src/hearings/hearing.test.data';
import { LovRefDataModel } from 'src/hearings/models/lovRefData.model';
import { MockRpxTranslatePipe } from '../../../../app/shared/test/mock-rpx-translate.pipe';
import { ParticipantAttendanceSectionComponent } from './participant-attendance-section.component';

describe('ParticipantAttendanceSectionComponent', () => {
  let component: ParticipantAttendanceSectionComponent;
  let fixture: ComponentFixture<ParticipantAttendanceSectionComponent>;

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
        ParticipantAttendanceSectionComponent,
        MockRpxTranslatePipe
      ],
      providers: []
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
    expect(component.participantAttendanceModes).toEqual(['Jane and Smith - In person']);
    expect(component.numberOfPhysicalAttendees).toEqual(3);
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
