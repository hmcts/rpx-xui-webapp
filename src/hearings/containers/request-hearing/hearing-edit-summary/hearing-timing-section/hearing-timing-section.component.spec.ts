import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockRpxTranslatePipe } from '../../../../../app/shared/test/mock-rpx-translate.pipe';
import { initialState } from '../../../../hearing.test.data';
import { LovRefDataModel } from '../../../../models/lovRefData.model';
import { HearingTimingSectionComponent } from './hearing-timing-section.component';

describe('HearingTimingSectionComponent', () => {
  let component: HearingTimingSectionComponent;
  let fixture: ComponentFixture<HearingTimingSectionComponent>;

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
        HearingTimingSectionComponent,
        MockRpxTranslatePipe
      ],
      providers: []
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
